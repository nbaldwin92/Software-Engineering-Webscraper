# E-Commerce Product Listing Analyzer

This web app allows the user to enter a URL of an Amazon or Ebay product and receive a score on a scale of 0-100. The score represents the likelihood that the product listing is a scam. 

First, a web scraper is used to get product reviews, seller ratings/reviews and the creation date of the seller's account.

Next, this data is passed into an algorithm which determines the likelihood that the listing is a scam. The user will be displayed a chart and a percentage score. If the listing is likely a scam, the user will be warned. Otherwise, they will be notified that the listing is likely safe and the seller is trusted.

View a demo [here](www.google.com)

## Installation

Clone this repo

```bash
https://github.com/nbaldwin92/ToDoList-master.git
```

## Usage

```javascript
npm run dev
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT License

Copyright (c) [2019] [Noah Baldwin]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
