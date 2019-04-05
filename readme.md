# better-minimal-counter

Original idea by [mnmly](https://github.com/mnmly/). Minimalistic counter js library.

![preview](https://raw.githubusercontent.com/NazarkinRoman/better-minimal-counter/master/preview.gif)

## Installation

    $ npm install --save git+https://github.com/NazarkinRoman/better-minimal-counter

## Usage

```javascript
  var BetterMinimalCounter = require( 'better-minimal-counter' ),
      bmc = new BetterMinimalCounter( 100 );
  
  document.body.appendChild( bmc.el );
  bmc.update( 80 );
```

## License

  MIT
