# Markdown to Slack Block Kit Node

This repository contains a custom N8N node that converts Markdown text into Slack Block Kit format using the [`@tryfabric/mack`](https://github.com/tryfabric/mack) library.

## Features

- **Markdown to Slack Block Kit Conversion**: Transform Markdown text into Slack Block Kit blocks for seamless integration with Slack messages.
- **Error Handling**: Option to continue execution even if the conversion fails.

## Installation

To install this node, add it to your N8N instance:

```bash
pnpm install n8n-nodes-markdown-slack-blocks
```

## Usage

1. Add the **Markdown to Slack Block Kit** node to your N8N workflow.
2. Provide the Markdown text you want to convert.
3. Configure the `Continue on Fail` option if needed.

## Example

Input Markdown:

```markdown
# Hello World
This is a sample message.
```

Output Slack Block Kit:

```json
[
    {
        "type": "header",
        "text": {
            "type": "plain_text",
            "text": "Hello World"
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "This is a sample message."
        }
    }
]
```

## Acknowledgments

This node use the [`@tryfabric/mack`](https://github.com/tryfabric/mack) library for Markdown parsing and Slack Block Kit generation.

## License

This project is licensed under the MIT License.