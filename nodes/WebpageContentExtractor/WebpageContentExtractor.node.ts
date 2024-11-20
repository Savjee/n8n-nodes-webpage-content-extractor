import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from 'n8n-workflow';

import {
    Readability as MozillaReadability
} from '@mozilla/readability'

import {
    JSDOM
} from 'jsdom'


export class WebpageContentExtractor implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Webpage Content Extractor',
        name: 'WebpageContentExtractor',
        icon: 'file:WebpageContentExtractor.svg',
        group: ['transform'],
        version: 1,
        description: 'Extracts the content from a given URL. Similar to the "Reader" mode in your browser, it ignores headers, footers, banners, etc.',
        defaults: {
            name: 'WebpageContentExtractor',
        },
        inputs: ['main'],
        outputs: ['main'],

        properties: [
            {
                displayName: 'HTML Code',
                name: 'html',
                type: 'string',
                required: true,
                default:'',
                placeholder: '',
                description: 'Use the "HTTP Request" node to fetch the HTML code of a website and pass it here',
            }
        ],
    };
    
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const output = [];

        for (let i = 0; i < items.length; i++) {
            const html = this.getNodeParameter('html', i) as string;
            const doc = new JSDOM(html);
            const article = new MozillaReadability(doc.window.document).parse();
         
            if(!article){
                throw new NodeOperationError(this.getNode(), "Could not extract main contents of webpage.");
            }

            output.push({
                json: {
                    excerpt: article.excerpt,
                    siteName: article.siteName,
                    length: article.length,
                    textContent: article.textContent,
                    content: article.content,
                    title: article.title,
                    language: article.lang,
                    byline: article.byline,
                    publishedTime: article.publishedTime,
                }
            });
        }

        return [this.helpers.returnJsonArray(output)];
    }
}

