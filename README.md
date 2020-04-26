[![Intro](https://github.com/bokub/nopaste/raw/images/intro.png)][intro-img]

[NoPaste](https://nopaste.ml/) is a client-side paste service which works with **no database**, and **no back-end code**

Instead, the data is **compressed** then **stored** into a unique URL that can be decoded later. For example, [this is the CSS code used by NoPaste][example]

As a result, there is no risk of data being lost, censored or deleted. The whole data stored is **in the link** and nowhere else! 🤯

**Note:** This project is a copy of [Topaz's paste service][topaz-example], with a reworked design and a few additional features (syntax highlighting, line numbers, line wrapping, embedding...)

## How it works

When you click on "Generate Link", NoPaste compresses the whole text using the
[LZMA algorithm](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm), encodes it in
[Base64](https://en.wikipedia.org/wiki/Base64), and puts it just after the first `/`, in the URL: `nopaste.ml/<your data goes here>`

When you open a link, NoPaste reads, decodes, and decompresses whatever is after the `/`, and displays the result in the editor

## Embedded NoPaste snippets

You can include NoPaste code snippets into your own website by clicking the _Embed_ button and using the generated HTML code

[This is what an embedded Paste snippet looks like](https://jsfiddle.net/bokub/nwtcdrph/show)

Feel free to edit the generated `height` and `width` attributes, so they suit your needs

[intro-img]: https://nopaste.ml/XQAAAQA6BAAAAAAAAAAFYH9Ev4Ly6wIDoAZQ25VXENWodOrWpmx8bfd8j6jeNeL/0fGICEpU6gh9GhXuFjqBBpJFOvefaxUXJquUWRQarmV+S0SHFOLUFyg/dw8OQI6RB6Y1yliOBWGL916HxAGqgwyLqjkH4w450OLk+q9oJYS6PrZfXU5uBC5DLe76OkG25ibvbsasKN51JuVyRedgoF/d7F9d6L7p02q0jHAM9pnPpKOKqlIVsNnXwYKXK10tnZ0GdiwJ3EeT//52uhw=?lang=python
[example]: https://nopaste.ml/XQAAAQAWDQAAAAAAAAAXioAj/ZZaukKWizx++f8w08qY+xe+w0AeNB0EtEDMR1jPECOrMSz2rcy5XqUVTzusmFXo407ujwufsB1Va3cy02BV4Chx15I+SbM8Ei2WS8/MaZa0wIOjHf0s6B9Kcwi1J73qYeIcKm39PEWGnBM4Ym5aXFOF1Irrn1N95vEcl4YI+98rydudZHmsNCmt995GvCpLImwH7yj3SlMadWaQA0jHCrY1ZBvhjSJ9mAAdYjCJLduITZuXomgpqtr3sYI1WKeRGNmPSD8J8WRLtCx0BZl3yWZZrUxJbmVod8cYiPJnlO+CzQA03qA/GZnxhMYd9TPc2Xlq8UIhBX6gmvo/xhHJc/WHnuBFB32xJ37O5FZlZuXGy6wFE/lakVteoqEqgvyaoBBB7p/UrGWZ0h4Wd8Hc3ceZ7KjJwmu2wLmbnWNnZ+bpusiwWhRNzdD/7u4a0FLd21QpiH8iXr9oQOFOctkswDCs8h1dio2ZWUFDAqVC586qrdFgrKRtCuJF9Zwlf2tQLY0BvyiK0c5EedA1rXK55OevIfKb6FVCUIbJVbcV/F9HpOY94Dha5mrokfqF7zj2fzRHR/1y2LEfmnt/wxN3Y5nwbm5rH6NDsCKadz9f0HzqVmgXW6p5SaxcT472M8dwmLM6yxNp5af7bpn33zyJhBhQifJciHOVJX+7oU7hfU/dmmt2fknBqRYv1WDbypIDe1TeKBba9sW7XFJChXGjZRhtinSL94WtDc7/l/USbiv9iAfBAVHs0XzU7naUtAKUFLyDqo4UWpauv4sNzaA7n5BbvPm+/xz+0uVgBsZBUyLpz/OUNGYaqbGFv44IVt99K3/cJwu8najWju0S6JJzZsSdI4CY4fHQ8bcI+WPUDzf49CE9hxZIVO5dCjmtnXs68RqSD4/wq6IwIGS6d8oku/0R/InHjqE2dZa0tU2Ko8DIIgrDnW1DNt89D/gWOQFOXN5+o3Mp1vgQL6AImLzudbiVamcAkrAVbRDcaq3AeI3dH1gKkvDUvpbSJuc+yPFRtnDByfTxt1EQCmbbCLck2UHQF4tWtJ2eQT4ICYborFh6Ams1TsOAUua5xqYGo9HXtDLeWcz21rNOtnc+Jtc+AtMg2UmEMZJXm+Jk/n280FNm+B6hbkafsHDJNQKyxCFX+N7/1yfwgVCkCKd3Hrad8ETI5rgso718tUiC0i4odYMpHCw2WfKUZm2DCUzmcEW9v8PWIM8okPFM+NgWNhusqQsilOu3RePRWdzdMpz/vt4w6qMJZMKDq/7C8eDPoxomrVCd++WA1v7qL46pT9ivyEMoQtagUsCaaj92Y9EoVkL5BbSl9yEkRA2LEIZf//FGYpQ97eu0KWgHDpGIdoQPh7RQB7oJgSA4i2x9n6iYn0HrlJKGgw+QXskkrBlWZsxua/6MWK/bqga14G3PqoB0CFXMhRcf4d4xUJiwUURFsaisIaMQM6Sy2O9TQN8wjEE7XYRTAgLfVIG8QyH3sBqXp00UaFouDRv0jRybuh0I1weudvBlJXcpTb6S0r2DjVr0u7Uy5b9LojNdXkuMZh4vGX5ZfW0bs2H0WPG5+11buP4A4u8IXIMD76Yt+p3GylpzO1PXbIjLhP5FnEc=?lang=css
[topaz-example]: https://topaz.github.io/paste/#XQAAAQDzAAAAAAAAAAAFFgvDUiqpf8dDPleMqfsqtbQYE28suCtDTB9iyFgGByXgSRMepMuokjoACV4UPgBzwM3p+V/N2rCi8m90FkQfsRuMJ4LrZVFgr81wKDc2okcywbJBz7OGNPpc8xu2lAkpSekqRO+I/OYMpqBE6w6JLw+cFocCptTbd+jBPuNfBVQrhYyQ3mN0BXmj+rejvVB8jG6J/HPP4u+m32pm0UBS0eb8rmaeDnanRkVI8/gs09nh8YK93sjVfIOAYOXoB2da//bUcos=
