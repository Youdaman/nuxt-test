// dato.config.js

module.exports = (dato, root, i18n) => {
  content = {
    hello: "world"
  }
  root.createDataFile("data/foobar.yml", "yaml", content)
}