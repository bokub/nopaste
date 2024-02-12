[![Intro](https://github.com/bokub/nopaste/raw/images/intro.png)][intro-img]

# What is NoPaste?

[NoPaste](https://nopaste.boris.sh/) is an open-source website similar to Pastebin where you can store any piece of code, and generate links for easy sharing

However, what makes NoPaste special is that it works with **no database**, and **no back-end code**. Instead, the data is compressed and **stored entirely in the link** that you share, nowhere else!

> [!NOTE]  
> Because all `.ml` domains have been taken down on July 17th, 2023, NoPaste has moved from [nopaste.ml](https://nopaste.ml/) to [nopaste.boris.sh](https://nopaste.boris.sh/)
>
> You may still be able to visit [nopaste.ml](https://nopaste.ml/) if your visited it **before** with the **same browser** (thanks to the offline usage feature), but it will not work for new visitors.
>
> Of course, all of your old links will continue to work if you just replace `nopaste.ml` with `nopaste.boris.sh`!
>
> Sorry for the disturbance, and thanks for your understanding!

### Because of this design:

-   🗑️ Your data **cannot be deleted** from NoPaste
-   🔞 Your data **cannot be censored**
-   👁️ The server hosting NoPaste (or any clone of it) **cannot read or access** your data
-   ⏳ Your data will be accessible **forever** (as long as you have the link)
-   🔀 You can access your data on **every NoPaste clone**, including [your own](https://github.com/bokub/nopaste/wiki/Deploy-your-own-version-of-NoPaste)
-   🔍 Google **will not index** your data, even if your link is public

> **Note:** This project is a copy of [Topaz's paste service][topaz-example], with a reworked design and a few additional features (syntax highlighting, line numbers, offline usage, embedding...)

## How it works

When you click on "Generate Link", NoPaste compresses the whole text using the
[LZMA algorithm](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm), encodes it in
[Base64](https://en.wikipedia.org/wiki/Base64), and puts it in the optional URL fragment, after the first `#` symbol: `nopaste.boris.sh/#<your data goes here>`

When you open a link, NoPaste reads, decodes, and decompresses whatever is after the `#`, and displays the result in the editor.

This process is done entirely **in your browser**, and the web server hosting NoPaste [never has access to the fragment](https://en.wikipedia.org/wiki/Fragment_identifier)

For example, [this is the CSS code used by NoPaste][example]

## Other features

### Embedded NoPaste snippets

You can include NoPaste code snippets into your own website by clicking the _Embed_ button and using the generated HTML code.

Here is an example of generated code and how it looks (click on the screenshot to see the interactive version)

```html
<iframe
    width="100%"
    height="243"
    frameborder="0"
    src="https://nopaste.boris.sh/?l=py#XQAAAQAbAQAAAAAAAAA0m0pnuFI8c+qagMoNTEcTIfyUWbZjtjmBYcmJSzoNwS5iVMWHzvowv3IPM0vOG5cjrtDRTSVP/0biTIrrahfmbkuMQBBeSiSGpaJOqYJiKmUDYn2Gp1RtWE6gm8fLHMB4eyZ3+rEbUQwWyMcmWqvZ7m96RUeFyZdYbE85JGvhghqF8cyPB0ZjV0OQWsDxn5O5ysMrIcL+pKPk89EtLjAHhA1LZL9F3hzAtTx7I+GlyrxhhXGxAN//CvtaAA=="
></iframe>
```

[![iframe](https://raw.githubusercontent.com/bokub/nopaste/images/pagerank.png)](https://jsfiddle.net/cqr2kxf5/)

Feel free to edit the `height` and `width` attributes, so they suit your needs

### Offline usage

When you visit NoPaste for the first time, its code is saved in your browser cache. After that, every NoPaste link you open
will load really quick, even if your internet connection is slow.

What if you have no internet connexion at all? No problem, NoPaste will still work perfectly!

### Editor features

-   Syntax highlighting (use the language selector)
-   Enable / disable line wrapping (use the button next to the language selector)
-   Delete line (`Ctrl+D`)
-   Multiple cursors (`Ctrl+Click`)
-   Usual keyboard shortuts (`Ctrl+A`, `Ctrl+Z`, `Ctrl+Y`...)

## Maximum sizes for links

NoPaste is great for sharing code snippets on various platforms.

These are the maximum link lengths on some apps and browsers.

| App     | Max length |
| ------- | ---------- |
| Reddit  | 10,000     |
| Twitter | 4,088      |
| Slack   | 4,000      |
| QR Code | 2,610      |
| Bitly   | 2,048      |
| TinyURL | 32,000     |

| Browser         | Max length                | Notes                                   |
| --------------- | ------------------------- | --------------------------------------- |
| Google Chrome   | (win) 32,779 (mac) 10,000 | Will not display, but larger links work |
| Firefox         | >64,000                   |                                         |
| Microsoft IE 11 | 4,043                     | Will not show more than 2,083           |
| Microsoft Edge  | 2,083                     | Anything over 2083 will fail            |
| Android         | 8,192                     |                                         |
| Safari          | Lots                      |                                         |

## Generate NoPaste links

NoPaste links can be created easily from your system's command line:

```bash
# Linux
echo -n 'Hello World' | lzma | base64 -w0 | xargs -0 printf "https://nopaste.boris.sh/#%s\n"

# Mac
echo -n 'Hello World' | lzma | base64 | xargs -0 printf "https://nopaste.boris.sh/#%s\n"

# Windows / WSL / Linux
echo -n 'Hello World' | xz --format=lzma | base64 -w0 | printf "https://nopaste.boris.sh/#%s\n" "$(cat -)"
```

## Deploy your own version of NoPaste

NoPaste is just a bunch of static files, making it really easy to deploy on any kind of file server.

Read [the wiki](https://github.com/bokub/nopaste/wiki/Deploy-your-own-version-of-NoPaste) to see how you can deploy your own version of NoPaste for free using Github Pages

[intro-img]: https://nopaste.boris.sh/?l=tcl#XQAAAQA6BAAAAAAAAAAFYH9MXlzSsUdj4vga48M86Ff/Bo1HzNmlXzjCWCN1Q/EliRJg00jhrYF9eDKWzDi+Su+Pv1o8yGz3V06CtGOt8u9dUN10KuOrmkUrjI/kUqitUUD34YXmq9twyrkxmOl5kaHPNqE2PWTRhnKWCEntngrOOlXC4kxxnXuGB2v4zJ75fIM0htURHr9ysHH+1nHvSRng4zpcYju3Y/RqpGTIowXGoUcIOeKKG8PpYf/9t33i
[example]: https://nopaste.boris.sh/?l=css#XQAAAQB2DQAAAAAAAAAXioAj/ZZaukKWizx++f8w08qY+xe+w0AeNB0EtEDMR1jPECOrMSz2rcy5XqUVTzusmFXo407ujwufsB1Va3cy02BV4Chx15I+SbM8Ei2WS8/MaZa0wIOjHf0s6B9Kcwi1J73qYeIcKm39PEWGnBM4Ym5aXFOF1Irrn1N95vEcl4YI+98rydudZHmsNCmt995GvCpLImwH7yj3SlMadWaQA0jHCrY1ZBvhjSJ9mAAdYjCJLduITZuXomgpqtr3sYI1WKeRGNmPSD8J8WRLtCx0BZl3yWZZrUxJbmVod8cYiPJnlO+CzQA03qA/GZnxhMYd9TPc2Xlq8UIhBX6gmvo/xhHJc/WHnuBFB32xJ37O5FZlZuXGy6wFE/lakVteoqEqgvyan4LfaiL0pMfYapWjV8YoPa/KyVGugANNjvtRw0hRr+Z1IgKoVL2a1xqvQiB65vIXkw68/ui82O1ko9HTbsLMHX/2/CgWZ8TkTEvgr0+dzVqQYIpaWpB3hDnUTHMkG2UehM5iJyJXAgODNqk8IiWCJn5k/j2FeFpchSTWdgi7AeaCowubmWnFTNgNFXLf5zzARWBUGQFT55TiC0ah4HL17jG3rY6fXvAXlm6CWc88ne7wF0opHkLnhfPslssDYo75hDmCfYwJ6asQ/YBkSuuLJjdCEXVjF7Pdw2FhsOiiB0gNXC6ehieM28M+PMGSDRqt0Q0KveMgE44YJ8zFOvpu2Gg41qDkrsYS7Xb/iMnHz66tt69I1rGzrHx88PuI2/CZx+kv+z7a+/Eiq4JC3KTDx4IbNUYptmrIOC2bxGrcjd8TBKGe+dNi8a/PEnXrUXc/OD7D680/Awo+scE8VKuRVN5R7OPg0tmKVQSQkyCf+I3//kGmREyhh6/bCv6tvbEc7hNPNE1js2svlVBF001JlLY7g1w6ls2pjxrKxuCLrkjba1n4s5WlfrbwcX18rqgbfL2tVibHggsy3Lgq4i7fXtuO3JifxfauO66YIRjEWFnACrHbZ14FbHDMylN7GMvo5TusxestU0s6+kiibWq2qZVpi7C5JVKURNQrGEabICn5nUDoOPMZSfNrdmlTOhu4qjKW09XdQPNazTMc83KjG1YOKNjRP23i1oav5muBFRGMDkSXt7wCgv5PCpLZM9w2jC5GCa5oHuH92IWJu5d80fvTRw3GxNQzfMRxgjzfH6xxrzu+EghhbzayUhb3U5aSRSxOtPTPfjT9mxgk7j3f1mRlbYheuhko4/LBIKYvfA5CnN2Yr3VyBYqoZ/ZgP871LU0ix8ZLeaecao0SDj6V35bZ6RB53mcU8BRPfcyZhj0H6BrFcrcfXKVwnNVro/cIrwnoG3GwlpCXGYJmDDeUdlbBj2HrVmvMncd3w8SzPtxw5RAWQP9YPJdE4Tc490BMX4zAkPqirRHLcxG/K5ECLtKtGsnCkg24+XwFo4XRcGfMsbkSSYD7oZ2HkD+1NXYqJKgk+7uee+yrYCZF6xbsb0ca/7r3w8nU9DueSa6XPiaCLSeJ+phw8iK1U4+FcCzqLW4LzgfcGjz64+HM+Xst0YuqzrAI2RU80H2Mr0FnC/qL+klbM+p0yNUBxBd4IQ64SJmh6Irgi7fZq2wfuTuVEAI1qKKwGwBQ6x9UDyY/OqkD63mtRL//oHeipA==
[topaz-example]: https://topaz.github.io/paste/#XQAAAQADAQAAAAAAAAAFFgvDUiqpf8dDPleMqfsqtbQYE28suCtDTB9iyFgGByXgSRMepMuokjoACV4UPgBzwM3p+V/N2rCi8m90FkQfsRuMJ4LrZVFgr81wKDc2okcywbJBz7OGNPpc8xu2lAkpSekqRO+I/OYUUvgB2ckKBp+2avxmAKn6H73WV3t1D5Ip9hwthecGUnLwFSGpPFNI0zb4Ettx7QnIu6NiftBuencR3Bn/l3BNoh8M5NQL2MoInMQAnQ1gGwSQg6uEnIvK70ERxjllyP2v2fH/N5CRAA==
