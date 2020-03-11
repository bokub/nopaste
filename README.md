[![Intro](https://github.com/bokub/paste/raw/images/intro.png)][intro-img]

> Paste is available at [`bokub.github.io/paste`](https://bokub.github.io/paste) ⚡

Paste is a client-side paste service which works **without any database** or back-end code

Instead, the data is **compressed** then **stored** into a unique URL that can be decoded later. For example, [this is the HTML code of the service][example]

As a result, there is no risk of data being lost or deleted. Nobody will ever be able to read your data unless you give them the link

> **Note:** This project is a clone of [Topaz's paste service][topaz-example], with a reworked design and additional features such as syntax highlighting, line numbers, and more


## How it works

When you click on "Generate Link", the whole text is compressed using the [LZMA algorithm](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm), encoded in [Base64](https://en.wikipedia.org/wiki/Base64), and put in the optional fragment at the end of the URL: `bokub.github.io/paste/#<data is here>`

When you open a link which contains data, the fragment is decoded, decompressed, and displayed in the editor


## Embedded Paste snippets

You can include code snippets into your own website by clicking the _Embed_ button and using the generated HTML code

[This is what an embedded Paste snippet looks like](https://jsfiddle.net/bokub/nwtcdrph/show)

Feel free to edit the generated `height` and `width` attributes so they suit your needs

[intro-img]: https://bokub.github.io/paste/?lang=python#XQAAAQBAAwAAAAAAAAAFYH9Ev4Ly6z/HjSL9A25RBz0bkd1tSahYhX4hPnzQ0/4mR2bSHR+DYlQzBmjK5Pf8qtSY95RpMhLlPaFIgxWdmDCvjn78eJJBPIAptv2ZfAqHq/9h2ppe7XXLit9Ia5ip17plAs0BpQFZuqXAdMVascQlCUQvZ8Kh+yfSI0NxZ6LH0iGlTmdC//9/93OA
[example]: https://bokub.github.io/paste/?lang=html#XQAAAQBICQAAAAAAAAAeCEUG0O+oKBdZ2an16qclPsVsA9xArjEo+v7wdal3Am1AsLdXzw9L86kFJA/HP3aMP31FQJprZ5BJcObQ9gG2mgk/o5ash0rBKVbyUAKaYDis7d4edb3x84EDgAqgJKRMcakcJsfTA+uQObpFvFBj4JdsawhToiw1f3rTDRF0BzhxihlMCqxRYKFQb7lOgjWPhG5X0YrIEDYqhOsPidFI+jXGLFay7Q18DShtXbTtor7HAiKD/vYrV4EftOwEhIx+9v4QIqbwBpmOJ7XkxV57CC6fb3sX+P/Tu/0qhTWxjOCVi1W1M9VepYdpS5pYNwcsMmpopEGli0YFXihb0sTTOQATnqsED8maqIRFGK22zsq3zfIe2tOvhKJMaz0KP6fSIWOMs2v73NpTNBaGR36IQJWdEk9EIZZPEtkqbaIlhC6eHJNoR7KUpEul6SIIr2oZX0Yo3rm01/KVZbpPM9Ua/SSSBT9KyqSzGjmXcx7BqFOxSpmo21R1pMOpTQYPsf/1AcyqAYo+0pv5tb0joMeqy50yJGlu42onyy8PKscboXSan7Heu5pDvl8QHaoGUWHQmbAeXk3Y9edWIVKos0OdALUk38ZWv/Iwxo62964C910663yISjuuqaUUqQ9gdQkWrONFpIf7rO7YhIfLKxE3dKU0dZFLBDNSYnv8I6GotgQWTIEDcjtKVcYH72CUda4lVdU1qFoql//LrlEUigPvSC6Tv1EUHiN/hWytcxTkbbqxTA7/8xnV3QEsMCDL+SDVB39SgZjlp/b7hbwHyR2R03IABtVRl+w9iH+Tje4FtJR+baENq36Sw3ZEudtbLZQC2PBHEkiDiQcxOMKdtA0qymNkLGcwSjMAbDh3+VY6V14wexvXT8ajNZ00q3Z9VJ3tPUloRUpBeOvuEmSGJdh+no0tja+z4djKGwu3O5Qi4a7x1UN7t+G7yStAZmZ8HAgyThCvmu4WGl0yFip3vcK6uoYIhEz0PqamVP5OGM3CdSU5oRB81/MYwHssPuRZ84QSN7NXFdlqKnxAo6JtJAEJpY1Yx+y1Vdonxzz7Xr2DKPUUFI+iH3GjfA/zpmk7FE5/iNGqqPgCK5wCdqwcDabk0LsfSaR8hpW4//FIpr0=
[topaz-example]: https://topaz.github.io/paste/#XQAAAQCiAAAAAAAAAAAFFgvDUiqpf8dDPleMqfsqtbQYE28suCtDTB9iyFgGByXFmowl4KuT1zR0KewRAjxBzVDFlaaSzZrLsTZN82bHBNa68mD6Hhjf6r2befIMbSVBF8hxtQCVzmmFJTLWz8Bj6c+XGOhkHz+MPe8nEJ2py8kO0IU7g03WBV7fzp2WTp1jlaD/4fcYAA==
