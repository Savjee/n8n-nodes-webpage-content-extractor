# n8n-nodes-webpage-content-extractor

This is an n8n community node. It extracts the contents from a given URL. Similar to the 'Reader' mode in your browser, it ignores headers, footers, banners, etc.

It's based on the [Readability library](https://github.com/mozilla/readability) that is used by Firefox's Reader View.


---

[Installation](#installation)  
[Operations](#operations)  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  



## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.


## Compatibility

Tested on n8n v1.20.0 and above.

## Usage

To use this node, fetch a website's HTML code with a "HTTP Request" node and then pass it on to WebpageContentExtractor.

This allows you to configure all aspects of the web request (method, authentication, headers, etc).


## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)


## Version history

### 0.1.0
Initial release

