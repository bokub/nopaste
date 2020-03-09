# Paste

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

Feel free to edit the `height` and `widht` attributes to your needs

[example]: https://bokub.github.io/paste/?lang=html#XQAAAQA4CAAAAAAAAAAeCEUG0O+oKBdZ2an16qclPsVsA9xArjEo+v7wdal3Am1AsLdXzw9L86kFJA/HP3aMP31FQJprZ5BJcObQ9gG2mgk/o5ash0rBKVbyUAKaYDis7d4edb3x84EDgAqgJKRMcakcJsfTA+uQObpFvFBj4JdsawhToiw1f3rTDRF0BzhxihlMCqxRYKFQb7lOgjWPhG5X0YrIEDYqhOsPidFI+jXGLFay7Q18DShtXbTtor7HAiKD/vYrV4EftOwEhIx+9v4QIqbwBpmOJ7XkxV57CC6fb3sX+P/Tu/0qhTWxjOCVi1W1M9VepYdpS5pYNwcsMmpopEGli0YFXihb0sTTOQATnqsED8maqIRFGK22zsq3zfIe2tOvhKJMaz0KP6fSIWOMs2v73NpTNBaGR36IQJWdEk9EIZZPEtkqbaIlhC6eHJNoR7KURPGu47nEAP6g+D/W3cz/jQrWuXe0mA6h6EGpfFJ1cqYcklTI+snJNjPlpm8c9mzroLRzySgySW/Ln1n2GdSYTDktiJ08fxN45oRCBQ4toU6upFIuulJlhKdRNhKrv5SJrFm0iSopJ2mbnnkg4Z5TxmePFG8ZUv2SKUiahzcATDFYf1lmKRA3s89yfy573LnUzdA5R4cU+BwVP1IcuddDNy7yQW1ZI/ButV4QBGqqTdKH+khb/Z6CGfZsKTOjbZ1AoCJkBborgHdGQZgDpqcH8vlnaGYQ8ZxC53gdyfSSd1jVoNK3qZqEzmqoA/t3nd3eoKQPZ6ptGPsdW0m/9lW0mxJh4Z+t1OiNSwkZTqebsfS6rbp8Iz7FUN9AQVUa7zumDpEpupkASB8EDGl9+IZ+vhWC8NObyJi1nAmZ2IBmWsacgOcR5tpAz3wqqhavdEuHs+G11uWFwYmUyw1spE4MrzmEU1wrlL0U02d7ajE8toU6yh1c+ywG101WUailsjUxctM/28cJmzBfGHUjwYcd4Frf9hrAyptNekB8Vo6SMT5Z8uYlg6AjrFmiMtfPFmwjb2IJU2j1vqMyJtSXN1icvVc8mfwPkFwpDd59W5p9OCMFHp//1lHBOQ==
[topaz-example]: https://topaz.github.io/paste/#XQAAAQCiAAAAAAAAAAAFFgvDUiqpf8dDPleMqfsqtbQYE28suCtDTB9iyFgGByXFmowl4KuT1zR0KewRAjxBzVDFlaaSzZrLsTZN82bHBNa68mD6Hhjf6r2befIMbSVBF8hxtQCVzmmFJTLWz8Bj6c+XGOhkHz+MPe8nEJ2py8kO0IU7g03WBV7fzp2WTp1jlaD/4fcYAA==
