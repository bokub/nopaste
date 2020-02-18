# Paste

Paste is a client-side paste service which works **without any database** or back-end code

Instead, the data is **compressed** then **stored** into a unique URL that can be decoded later. For example, [this is the HTML code of the service][example]

> **Note:** This project is a clone of [Topaz's paste service][topaz-example], with a reworked design and additional features such as syntax highlighting, line numbers, and more

## How it works

When you click on "Generate Link", the whole text is compressed using the [LZMA algorithm](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm), encoded in [Base64](https://en.wikipedia.org/wiki/Base64), and put in the optional fragment at the end of the URL: `bokub.github.io/paste/#<data is here>`

When you open a link which contains data, the fragment is decoded, decompressed, and displayed in the editor

[Format code]: # ( npx prettier --write --single-quote --tab-width=4 --print-width=120 index.js *.{html,css,md} )

[example]: https://bokub.github.io/paste/?lang=HTML#XQAAAQBDBwAAAAAAAAAeCEUG0O+oKBdZ2an16qclPsVsA9xArjEo+v7wdal3Am1AsLdXzw9L86kFJA/HP3aMP31FQJprZ5BJcObQ9gG2mgk/o5ash0rBKVbyUAKaYDis7d4edb3x84EDgAqgJKRMcakcJsfTA+uQObpFvFBj4JdsawhToiw1f3rTDRF0BzhxihlMCqxRYKFQb7lOgjWPhG5X0YrIEDYqhOsPidFI+jXGLFay7Q18DShtXbTtor7HAiKD/vYrV4EftOwEhIx+9v4QNwZnLSwUscY6W6QcwG/FkV1J8/Q8a4v7E2U0yyVaWb4RXDsy2idMYak/KABWGc3fqB1PkyeWIgrSydSjnfP7ywvJA/zDwk9M1SMpFi1ick30SSbtx03xRhuH5Rd+DVIe5ZySuH9x0MxsXE+cMNOZqBn7RvAtAofFiY/suJ9rDWi8pafibzEOMF7CDPcdUSRincTXV7ID76oZPIZPJW/YMqnwSlP9lyLnByMtsTjYkCeBT2oYZrzu9E9R9ltNsGM2EbqoeqSsbiOFdpZ4tlY2MsD/Wu6NCj5Bm1jkUuObZ0Jbk9Z6XPbp5b6PaYOVo06bYs+pX/+0dV4ShqtNrNOnw4sqeN1KrjeIk8fQ+Tei7vf0hVm7682xQbk4u/kpK2ytMewaoXyh4dcyL5VCUFeVMbLgvB4F3KTrtQUQTJ3Hh1pjFUR2tCe70YCWNoiRcLD59GiyofsmUsZMH87IsvGUo/WCcVYs4RYAgnluSwrUqJ4LiJkZF/USlqYOame0T+ERXr+51/32bFnqhDiNEnF4yptuq8EH69+GwfTzglFXNyTUbu83reCkXlSjnTFRlAnBdj4MPSEfud25dnpK3xEjpnlIxl2HBBVc8Z1gwuq3TL4/7w7/oQ8MS7Y4ctWNTrLyRur8VWWQsDcz3Lw81l4h7dw/8jNyxSl08r5AOd1oZI471l76AyDIoaSh7y3n39lVmDmvJIh8S/0rNQI=
[topaz-example]: https://topaz.github.io/paste/#XQAAAQCiAAAAAAAAAAAFFgvDUiqpf8dDPleMqfsqtbQYE28suCtDTB9iyFgGByXFmowl4KuT1zR0KewRAjxBzVDFlaaSzZrLsTZN82bHBNa68mD6Hhjf6r2befIMbSVBF8hxtQCVzmmFJTLWz8Bj6c+XGOhkHz+MPe8nEJ2py8kO0IU7g03WBV7fzp2WTp1jlaD/4fcYAA==
