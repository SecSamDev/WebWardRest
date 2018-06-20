require_relative './lib/arachni/rpc/pure'
require 'json'
require 'uri'

def getInputUser()
    STDOUT.flush  
    line = STDIN.gets.chomp
    if line == ' exit'
        p "Exiting script..."
        exit
    else
        return line
    end
end

dispatcher_ip = ARGV[0] || '127.0.0.1'
dispatcher_port = Integer(ARGV[1] || 7331)
dispatcher_owner = ARGV[2] || 'WEB_WARD'
instance_token = ARGV[3] || nil
instance_url = ARGV[4] || nil

if instance_token.nil? && instance_url.nil?
    ab = instance_url.split(':')
    instance_host = ab[0]
    instance_port = ab[1]
    instance_info = {token: instance_token,url: instance_url,port:instance_port,host:instance_host}
else
    # Dispatcher_ip Dispatcher_port host
    dispatcher = Arachni::RPC::Pure::Client.new(
        host:  dispatcher_ip,
        port:  dispatcher_port
    )

    instance_info = dispatcher.call( 'dispatcher.dispatch', dispatcher_owner )
    # => {
    #         "token" => "1ac10910f41ce86e23ab954033b40a83",
    #           "pid" => 27031,
    #          "port" => 23496,
    #           "url" => "127.0.0.1:23496",
    #         "owner" => "The Dude",
    #     "birthdate" => "2014-08-05 19:54:07 +0300",
    #     "starttime" => "2014-08-05 19:54:58 +0300",
    #       "helpers" => {}
    # }

    # We need the info for the client
    p instance_info.to_json
    a = instance_info['url'].split(':')
    instance_info['host'] = a[0]
end


#If no instances then returns false

instance = Arachni::RPC::Pure::Client.new(
    host:  instance_info['host'],
    port:  instance_info['port'],
    token: instance_info['token']
)
begin
    if instance.call( 'service.alive?' )
        while true
            begin
                readed = getInputUser()
                case readed
                when 'exit'
                    break
                when 'alive'
                    p instance.call( 'service.alive?' )
                when 'busy'
                    a = instance.call( 'service.busy?' )
                    if(!a)
                        p false
                    else
                        p a
                    end
                when 'scan'
                    begin
                        sleep 1
                        p true
                        input_prop = getInputUser()
                        arach_properties = JSON.parse(input_prop)
                        instance.call( 'service.scan', arach_properties)
                        p true
                    rescue => e
                        p false
                    end
                when 'report'
                    report =  instance.call( 'service.report' )
                    p report.to_json
                else
                    p false
                end
            rescue => e
            end
        end
    else

    end
rescue => e
    instance.call('service.shutdown')
exit
end


