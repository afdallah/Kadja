# Kadja
Kadja is a lightweight vanilla javascript plugin to make your input text mirror simultanously 


## Setup
```javascript
var post = new Kadja('#konten-source', {
    newLine: false,
    callback: function (content) {
        // Use external markdown parser
        return marked(content)
    }
})
```

## Destroy initialized plugin
```javascript
var post = new Kadja()

// Destroy
post.destroy()
```
 
