[![Intro](https://github.com/bokub/nopaste/raw/images/intro.png)][intro-img]

[NoPaste](https://nopaste.ml/) is a client-side paste service which works with **no database**, and **no back-end code**

Instead, the data is **compressed** then **stored** into a unique URL that can be decoded later. For example, [this is the CSS code used by NoPaste][example]

As a result, there is no risk of data being lost, censored or deleted. The whole data stored is **in the link** and nowhere else! 🤯

**Note:** This project is a fork of [Topaz's paste service][topaz-example], with a reworked design and a few additional features (syntax highlighting, line numbers, embedding...)

## How it works

When you click on "Generate Link", NoPaste compresses the whole text using the
[LZMA algorithm](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm), encodes it in
[Base64](https://en.wikipedia.org/wiki/Base64), and puts it in the optional fragment, at the end of the URL: `nopaste.ml/#<your data goes here>`

When you open a link which contains data, NoPaste decodes the fragment, decompresses it, and displays the result in the editor

## Embedded NoPaste snippets

You can include NoPaste code snippets into your own website by clicking the _Embed_ button and using the generated HTML code

[This is what an embedded Paste snippet looks like](https://jsfiddle.net/bokub/nwtcdrph/show)

Feel free to edit the generated `height` and `width` attributes, so they suit your needs

[intro-img]: https://nopaste.ml/?lang=python#XQAAAQA6BAAAAAAAAAAFYH9Ev4Ly6wIDoAZQ25VXENWodOrWpmx8bfd8j6jeNeL/0fGICEpU6gh9GhXuFjqBBpJFOvefaxUXJquUWRQarmV+S0SHFOLUFyg/dw8OQI6RB6Y1yliOBWGL916HxAGqgwyLqjkH4w450OLk+q9oJYS6PrZfXU5uBC5DLe76OkG25ibvbsasKN51JuVyRedgoF/d7F9d6L7p02q0jHAM9pnPpKOKqlIVsNnXwYKXK10tnZ0GdiwJ3EeT//52uhw=
[example]: https://nopaste.ml/?lang=css#XQAAAQAJCgAAAAAAAAAXioAj/ZZaukKWizx++f8w08qY4GA8LGtu7D/+DJgBVbs7/H2nJiaW8ID1VsHyIYWju5V2entWd4LyJ3xLdIHOdqb6g4zCuKHW0LDkvxJASgscbV2ZWQYLqVAGQt2rZZb+5p53hL6Z3WVof2ddJK47JK2Q1NCpMOZAcKeH9qzh9kDYOOB3NrWiyPoQMYdvZrGIhl7witUWpqgp6yr+ktHW4199Cdzdx1pOwNcRHkMIf8lCsLbb3O0QELaOwY11bn1qgoSFSRSNdClnM3V8rZkAAhE3RbRh0zUBGqjBkDqa0Yjw5ZrNIIm1v8aSd0s2ygAcrwfWhm1vQEfJLbScPHXYJ2zeB6QYodQyRb47gvQ2KTVGJhmfJaeh4/9Vz1lArsRUhbXrTOl4fS1tOI+etrSMv1tkPP12MrEGUjFPiioVd+RIOWG+g9AFKte9YJM5E5XQgOiOAnt/O4eHw+Hd3ssC+Y5MpZXlSUck3v0Vzn3mW0NyygeT3VpdvtruJ2WMXvPAkF9nHbf2DCIVf5TOCqhLOtDrhYENn225Suw3XVhp9U7mzCNLIXFMZdFGNMhXQDaGgo9gxRiSVurY6BeUKGezHjcSCJKszaweI3/+FDdb7hKVHXzCppXITy5tEI41fOzJ54l3cDn9G0oGl8wrNdP5Enp5y/R+NwXq2LJra1oDYUO8E1A+Kk3c5w6z5Vq1+qgWlzjdIgkQ+7a3Aycnl43zA+cPNMHJaJ+HyaMUxCOp/NX++0Cq3EVfuPAQddyP+hewz0q479ktMOQf+f6a+D0Kkz4U47LIBA+6cN9vy07MSZyy0txqWbXVC6HmxeVrhfR9VrshwwvZniXuDewi8+jm0hhr0KosTLs+8pjbqrB7du2szOIJUEzdB5AaFROEoTUL8BWHFGnLmh42kujEKrGdaMrDdm6MgA9qRg7ioyFAvhvrLZ33zMDgNRtQ3rMmtYusQOx2XAtTtHQQI5fwuRck0ZWPeVMUFLo8AcCl06kNwtG8XxnRzkRaoiieulaOi2kVEUl/FBBgKt08Xar1j5xTlV0VtL0NLIAC8LqGtyjqvZUxafmwAHZc/16zBnylT1v4mJfCgJa+Y/Inj9OFDQL5yPa5crUoDEdjtyFQCOo6pVd189UkR/PhNp4LyZT9llIyzfcSqtMN235OxHcwc6WWek5P0/sN+Kq1PS//UrDrBtvl0XFegyPa3AO5F+67vjmJNdmogMVxI3cffIsYG123ujkiRHNcU/uT7XJhw6xMPu/e10HiMEz/8VclWg==
[topaz-example]: https://topaz.github.io/paste/#XQAAAQAAAQAAAAAAAAAFFgvDUiqpf8dDPleMqfsqtbQYE28suCtDTB9iyFgGByXgSRMepMuokjoACV4UPgBzwM3p+V/N2rCi8m90FkQfsRuMJ4LrZVFgr81wKDc2okcywbJBz7OGNPpc8xu2lAkpSekqRO+I/OYMpfHj0xXOussogYYnjDvlmjQ8IAjOjgxiGlI+IRMJvX+FWS6EgMz58UYCIp9qXpSm5RXTK1jq5KXeYI20a9i/kSiEwgldHO8txFQmZAYEH9oKJyGJLTAKsUuhuXVHxv/xxEyI
