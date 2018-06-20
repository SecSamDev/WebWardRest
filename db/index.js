const { DeploymentFile, KubernetesDeploy, DockerDeploy } = require('../kube/deploy-file')
const { Pool } = require('pg')
const crypto = require('crypto');

const hash_admin = crypto.createHash('sha256');
hash_admin.update(process.env.ADMIN_PASS ? process.env.ADMIN_PASS : 'admin');
const ADMIN_DEFAULT_PASSWORD = hash_admin.digest('base64');



/**
 * Not const to allow reconnection
 */
var pool;

async function main(optConnect = {
    user: process.env.PGUSER || 'webward',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'webward',
    password: process.env.PGPASSWORD || 'webward',
    port: process.env.PGPORT || '5432'
}) {
    pool = new Pool(optConnect)
    try {
        await connect();
    } catch (err) {
        throw err;
    }
    try {

        await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `
        )
    } catch (err) {
        console.error("Extension creation failed: pgcrypto - uuid-ossp")
    }

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                name text NOT NULL UNIQUE,
                password text NOT NULL,
                email text NOT NULL UNIQUE,
                role int NOT NULL DEFAULT 0,
                manager UUID,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                status int NOT NULL DEFAULT 0
            );
            INSERT INTO users 
                (name,password,email,role,status) 
                VALUES 
                ('admin','${ADMIN_DEFAULT_PASSWORD}','admin@admin.com',3,1)
                ON CONFLICT (name) DO NOTHING;
            -- In system and platform we need to store pairs like "os" : "CentOS 7.1"
            CREATE TABLE IF NOT EXISTS web_projects (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                name text NOT NULL UNIQUE,
                description text NOT NULL DEFAULT 'Insert Description',
                system jsonb,
                platform jsonb,
                project_manager UUID NOT NULL,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                status int NOT NULL DEFAULT 0
            );
            -- WebWard Properties. Only accesible by the Admins
            CREATE TABLE IF NOT EXISTS ww_properties (
                name text PRIMARY KEY,
                value text NOT NULL
            );
            -- WebWard modules. Only accesible by the Admins
            CREATE TABLE IF NOT EXISTS ww_modules (
                name text PRIMARY KEY,
                origin text NOT NULL,
                value json NOT NULL
            );
            CREATE TABLE IF NOT EXISTS scan_profile (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                name text NOT NULL UNIQUE,
                description text NOT NULL DEFAULT 'Insert Description',
                checks text NOT NULL DEFAULT '',
                owner UUID NOT NULL,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS environment (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                name text NOT NULL UNIQUE,
                description text NOT NULL DEFAULT 'Insert Description',
                url text NOT NULL,
                type int NOT NULL DEFAULT 2,
                project UUID NOT NULL,
                scan_periodicity int NOT NULL DEFAULT 1440,
                last_scan date NOT NULL DEFAULT current_timestamp,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS kube_objects (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                name text NOT NULL UNIQUE,
                description text NOT NULL DEFAULT 'Insert Description',
                content jsonb NOT NULL,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS infrastructure (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                name text NOT NULL UNIQUE,
                description text NOT NULL DEFAULT 'Insert Description',
                content jsonb NOT NULL,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS web_hooks (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                name text NOT NULL DEFAULT '',
                node UUID NOT NULL UNIQUE
            );
            CREATE TABLE IF NOT EXISTS pipelines (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                web_project UUID NOT NULL,
                owner UUID NOT NULL,
                name text NOT NULL UNIQUE,
                description text NOT NULL DEFAULT 'Insert Description',
                status int NOT NULL DEFAULT 5,
                cluster_owner text NOT NULL,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                acquire_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (current_timestamp - interval '30 seconds'),
                start_date TIMESTAMP WITH TIME ZONE,
                end_date TIMESTAMP WITH TIME ZONE
            );
            CREATE TABLE IF NOT EXISTS pipeline_nodes (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                tag text NOT NULL,
                name text NOT NULL,
                type text NOT NULL DEFAULT 'ANY',
                pipe UUID NOT NULL,
                x real NOT NULL DEFAULT 1,
                y real NOT NULL DEFAULT 1,
                height real NOT NULL DEFAULT 300,
                width real NOT NULL DEFAULT 200,
                data jsonb,
                io_params jsonb,
                status int NOT NULL DEFAULT 0,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                end_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS node_stored (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                tag text NOT NULL,
                name text NOT NULL,
                type text NOT NULL DEFAULT 'ANY',
                owner UUID NOT NULL,
                pipe text,
                x real NOT NULL DEFAULT 1,
                y real NOT NULL DEFAULT 1,
                height real NOT NULL DEFAULT 300,
                width real NOT NULL DEFAULT 200,
                data jsonb,
                io_params jsonb,
                status int NOT NULL DEFAULT 0,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                end_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS arachni_scan (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                token text NOT NULL,
                url text NOT NULL,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS scan_report (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                project UUID NOT NULL,
                name text NOT NULL DEFAULT 'Report',
                reporter text NOT NULL DEFAULT 'WebWard',
                data jsonb,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
            CREATE TABLE IF NOT EXISTS threat_model (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
                project UUID NOT NULL,
                name text NOT NULL DEFAULT 'Threat Model',
                description text NOT NULL DEFAULT 'Description for Threat Model',
                applicationType text NOT NULL DEFAULT 'WebApp',
                owners UUID[],
                authors UUID[],
                stakeholders UUID[],
                url text NOT NULL,
                version integer NOT NULL DEFAULT 1,
                review integer NOT NULL DEFAULT 1,
                threatModelTemplate text,
                threatModelFile text,
                threatModelReport text,
                create_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
                last_update TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
            );
        `
        );
    } catch (err) {
        console.error(err)
    }
}

async function connect(retry = 0) {
    try {
        const res = await pool.query('SELECT NOW()')
        retry = 0;
    } catch (err) {
        retry++;
        if (retry < 5) {
            await connect(retry);
        } else {
            throw err;
        }
    }

}


module.exports = {
    connect: async (opts) => {
        await main(opts)
    },
    /**
     * Do a query in the DB
     */
    query: async (text, params) => {
        if (!pool)
            await main()
        return pool.query(text, params)
    },
    /**
     * End db connection
     */
    end: async () => await pool.end(),
    /**
     * Hash using sha256
     */
    hash: async (data) => {
        return crypto.createHash('sha256').update(data).digest('base64');
    },
    /**
     * Check if the superuser password is set to default
     */
    isAdminPassDefault: async () => {
        let res = await pool.query(`SELECT password FROM users WHERE name='admin'`, []);
        if (res.rows.length > 0) {
            if (res.rows[0].password === ADMIN_DEFAULT_PASSWORD) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    },
    getClient: async () => {
        return await pool.connect();
    },
    reconnect: async (options) => {
        await main(options)
    }
}

