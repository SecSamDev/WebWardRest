# Telegram Bot

Used to send messages to chats, it can support Markdown and HTML.
The bot needs the Chat Name and a token to send notifications. 
In reality the bot needs the ChatID too, but we can extract it from the lasts messages received by the bot and search for a chat name that match ours.

* **Warning** (Only needed if the bot has not save the chatID in the node)*
For this to work we need to send the start command in the chat to the bot (**/start@NameOfBot**), or re-inviting the bot to the chat. When the bot found our chatID it will store the chatID in the node for future uses.

### Node parameters

The next node parameters are used by the bot:
* **_CHAT**: The chat Name.
* **_CHAT_ID**: The chat ID of our chat. Automatically discovered by the bot, although we can provide it.
* **_TOKEN**: The acces token for accessing the Telegram Bot API.
* **_PRE_MESSAGE**: Message to be printed first by the bot, like: "Hello this is the security bot".
* **_PARAM_PRINT**: List of parameters to be printed by the bot. If there is only one parameter the bot will omit the parameter name.


### HTML Support
The Telegram Bot supports HTML and Markdown but with limitations.

To use this mode, pass HTML in the parse_mode field when using sendMessage. The following tags are currently supported:

<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>

Please note:

    Only the tags mentioned above are currently supported.
    Tags must not be nested.
    All <, > and & symbols that are not a part of a tag or an HTML entity must be replaced with the corresponding HTML entities (< with &lt;, > with &gt; and & with &amp;).
    All numerical HTML entities are supported.
    The API currently supports only the following named HTML entities: &lt;, &gt;, &amp; and &quot;.
Extracted from [Telegram Bot API](https://core.telegram.org/bots/api#html-style)