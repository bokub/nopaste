[![Intro](https://github.com/bokub/nopaste/raw/images/intro.png)][intro-img]

[NoPaste](https://nopaste.ml/) is a client-side paste service which works with **no database**, and **no back-end code**

Instead, the pasted data is **compressed** then **stored** into a unique URL that can be decoded later. For example, [this is the HTML code of the service][example]

As a result, there is no risk of data being lost, censored or deleted. The whole data is **in the link** and nowhere else 🤯

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
[example]: https://nopaste.ml/?lang=html#XQAAAQBUCQAAAAAAAAAeCEUG0O+oKBdZ2an16qclPsVsA9xArjEo+v7wdal3Am1AsLdXzw9L86kFJA/HP3aMP31FQJprZ5BJcObQ9gG2mgk/o5ash0rBKVbyUAKaYDis7d4edb3x84EDgAqgJKRMcakcJsfTA+uQObpFvFBj4JdsawhToiw1f3rTDRF0BzhxihlMCqxRYKFQb7lOgjWPhG5X0YrIEDYqhOsPidFI+jXGLFay7Q18DShtXbTtor7HAiKD/vYrV4EftOwEhIx4+QJek98/8NI1prL34cmhuwIMl03D/F8/ijbaohNmhi34/gBcKsIXF8YeJDO38BE4arnsM5u72OLp2kNGcM4gpsjq9RXeRVGj2wDHbfuxw+swN3lcnLMEfbnfTuplO2zZIrfTJWiPOoDS4kxaIUf+1+UhffUA4nF/DSXaCy4NPENINk/9lj2lt8PWjiVcKioRIfsYNXnk0jHkPuUsd1ZnhqZME2V0xVJqp/3eENSLwYITfBWkS7HjcAC54KwLYmdFVEQkkM7hN/pEBpVpo5yjCqZJtllf3zzWh7zl+ygo/1lu3Ns/IzHvUEhvKxoS8CrydYJgEatBNcHfz7PsT0yr8DikUp0yl1Jo6uOpJ4sSVK0lxHg6/le7kpF3yAWDKp5A6dTZzJMn0wpFQn+BGYUE57wZ36ea5H9V/R/Gb85GDMGGUC3mUYA2d0hpBkZ7Lq+rnsXU3u8YWklQajdr1qhiX3YdGTMgbeczKiuxQCqNCO6hqvsmvjunmqE/nL6L864c2Kbo9mqs9gvyfsGC//xzLHxKIkhP+hNmfEItw8IHnci3pRRJge8rKUN3PiJDVBadudeCPirDTGVOOmKt8KTebwXluSp+B1lcujeTl+idLcrgq7QClPftbk0/tBlahYRtupXzX0XiTAJ7bZAzXRtUSY6RimiaGjQjem0NORR91yqUx6W572zG1hvI900/+F9lZEZ0R5boXmxUPnuJYQXlYDxAXNEpusrvquCcS8Mblu2XRqaCDQTsJjb/msVD5TcJTUADPKunwHlFiYiGC4nLNlqs0IEoblvpmP/9wp0otSPHb0gmCsEndDPMp3ezD6E0UNImrvBGGpyjLaDafWxogUaXnZxb/jYP1pGrS4sU/6xjDhv/5G6FEg==
[topaz-example]: https://topaz.github.io/paste/#XQAAAQAAAQAAAAAAAAAFFgvDUiqpf8dDPleMqfsqtbQYE28suCtDTB9iyFgGByXgSRMepMuokjoACV4UPgBzwM3p+V/N2rCi8m90FkQfsRuMJ4LrZVFgr81wKDc2okcywbJBz7OGNPpc8xu2lAkpSekqRO+I/OYMpfHj0xXOussogYYnjDvlmjQ8IAjOjgxiGlI+IRMJvX+FWS6EgMz58UYCIp9qXpSm5RXTK1jq5KXeYI20a9i/kSiEwgldHO8txFQmZAYEH9oKJyGJLTAKsUuhuXVHxv/xxEyI
