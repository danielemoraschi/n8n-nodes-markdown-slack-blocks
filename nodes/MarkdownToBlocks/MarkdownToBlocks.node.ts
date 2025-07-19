import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

import { markdownToBlocks } from '@tryfabric/mack';

export class MarkdownToBlocks implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Markdown to Slack Block Kit',
		name: 'markdownToBlocks',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		description: 'Converts Markdown text to Slack Block Kit format.',
		defaults: {
			name: 'Markdown to Slack Block Kit',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Markdown Text',
				name: 'markdownText',
				type: 'string',
				required: true,
                typeOptions: {
                    rows: 10,
                },
				default: '',
                requiresDataPath: 'multiple',
				description: 'The Markdown text to convert to Slack Block Kit format',
			},
			{
				displayName: 'Continue on Fail',
				name: 'continueOnFail',
				type: 'boolean',
				default: false,
				description: 'Whether to continue if the request fails',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const markdownText = this.getNodeParameter('markdownText', itemIndex) as string;
				if (!markdownText) {
					throw new NodeOperationError(this.getNode(), 'The Markdown text parameter is empty.', {
						itemIndex,
					});
				}

				const blocks = await markdownToBlocks(markdownText.split('\\n').join('\n'));
				returnData.push({
					json: {
						blocks,
					},
				});
			} catch (error) {
				const continueOnFail = this.getNodeParameter('continueOnFail', itemIndex, false) as boolean;
				if (continueOnFail) {
					returnData.push({
						json: {
							markdownText: this.getNodeParameter('markdownText', itemIndex, '') as string,
							blocks: [],
							error: (error as Error).message,
						},
					});
					continue;
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
