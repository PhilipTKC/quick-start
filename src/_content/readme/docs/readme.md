---
title: Code Collection Example
---

# Awesome Code

```ts
console.log('Hello world');
```

{{ group="group1" tabs=["Typescript", "Javascript", "Markdown", "C#"] }}

```ts { group="group1" tab="Typescript" }
console.log('Hello world');
```

```js { group="group1" tab="Javascript" }
function generateRandomCodeSnippet() {
  // List of keywords and symbols to use in the code
  const keywords = ['let', 'const', 'if', 'else', 'for', 'while', 'function', 'return', 'console.log'];
  const symbols = ['=', '==', '===', '!=', '!==', '+', '-', '*', '/', '%', '++', '--', '(', ')', '{', '}', ';'];

  // Randomly choose the number of lines of code to generate
  const numLines = Math.floor(Math.random() * 5) + 1;

  // Generate each line of code
  let code = '';
  for (let i = 0; i < numLines; i++) {
    // Randomly choose the length of the line of code
    const lineLength = Math.floor(Math.random() * 5) + 1;

    // Generate the line of code
    let line = '';
    for (let j = 0; j < lineLength; j++) {
      // Randomly choose a keyword or symbol
      const isKeyword = Math.random() < 0.5;
      const word = isKeyword ? keywords[Math.floor(Math.random() * keywords.length)] 
      : symbols[Math.floor(Math.random() * symbols.length)];

      // Add the word to the line of code
      line += word + ' ';
    }

    // Add the line of code to the overall code snippet
    code += line.trim() + ';\n';
  }

  // Return the generated code snippet
  return code;
}

// Example usage
console.log(generateRandomCodeSnippet());
```

```md { group="group1" tab="Markdown" }
# Hello
```

```cs { group="group1" tab="C Sharp" }
Console.WriteLine("Hello World")
```

{{ /group }}

{{ group="group2" tabs=["Typescript", "Javascript"] }}

```ts { group="group2" tab="Typescript" }
console.log('Hello world');
```

```js { group="group2" tab="Javascript" }
function generateRandomCodeSnippet() {
  // List of keywords and symbols to use in the code
  const keywords = ['let', 'const', 'if', 'else', 'for', 'while', 'function', 'return', 'console.log'];
  const symbols = ['=', '==', '===', '!=', '!==', '+', '-', '*', '/', '%', '++', '--', '(', ')', '{', '}', ';'];

  // Randomly choose the number of lines of code to generate
  const numLines = Math.floor(Math.random() * 5) + 1;

  // Generate each line of code
  let code = '';
  for (let i = 0; i < numLines; i++) {
    // Randomly choose the length of the line of code
    const lineLength = Math.floor(Math.random() * 5) + 1;

    // Generate the line of code
    let line = '';
    for (let j = 0; j < lineLength; j++) {
      // Randomly choose a keyword or symbol
      const isKeyword = Math.random() < 0.5;
      const word = isKeyword ? keywords[Math.floor(Math.random() * keywords.length)] 
      : symbols[Math.floor(Math.random() * symbols.length)];

      // Add the word to the line of code
      line += word + ' ';
    }

    // Add the line of code to the overall code snippet
    code += line.trim() + ';\n';
  }

  // Return the generated code snippet
  return code;
}

// Example usage
console.log(generateRandomCodeSnippet());
```

{{ /group }}

# Lazy Loading Example

Keep scrolling down to see images lazy load!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis, neque a gravida ornare, turpis nulla laoreet mauris, eget rhoncus turpis magna quis felis. Praesent suscipit risus ex, quis volutpat massa tincidunt nec. Curabitur eleifend velit nibh, sed pellentesque odio varius at. Mauris tincidunt volutpat orci, sit amet faucibus ante consequat non. Aliquam consectetur ac libero in imperdiet. Proin aliquam quam commodo justo rutrum, sit amet facilisis augue mattis. Praesent volutpat justo sit amet auctor laoreet. Vestibulum vitae ligula interdum, volutpat velit non, maximus felis. Integer nec rhoncus metus. Praesent convallis risus id purus porttitor dignissim. Sed nec urna aliquam, volutpat magna eget, congue nibh. Integer at fermentum magna.

Integer mattis vestibulum magna et lobortis. Nulla facilisi. Mauris ac pharetra urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam nec dui vel massa finibus convallis. Nam vestibulum dui vitae erat dignissim, ac interdum urna congue. Maecenas quam purus, aliquam eget sagittis vel, elementum quis turpis. Suspendisse molestie vulputate leo, nec consequat justo vulputate at. Proin at congue mi, non fermentum libero. Aenean congue, nunc quis maximus tincidunt, risus justo hendrerit elit, vitae volutpat tellus est id urna.

Nullam tempor, sem eu sodales varius, turpis quam fermentum ipsum, in aliquet ante tortor in lorem. Vestibulum ultrices augue eu convallis pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec gravida fermentum neque ac ultrices. Donec ut risus nec tortor mattis faucibus. Maecenas aliquam eget mi sed feugiat. Pellentesque ex justo, scelerisque nec turpis in, sodales volutpat sapien. Aenean sed lacus eget diam pulvinar scelerisque. Curabitur tortor libero, sagittis in elementum quis, viverra vel felis. Suspendisse lacinia leo lacus, vel imperdiet ipsum eleifend id. Aenean massa nulla, bibendum vel sagittis scelerisque, fermentum quis erat. Proin nec metus at orci fermentum placerat. In interdum mi eu quam mattis, in blandit justo imperdiet.

Ut ultrices, augue eu laoreet convallis, massa purus semper eros, sit amet mattis quam tortor vel risus. Vestibulum consectetur bibendum felis, in tempus orci tristique a. Curabitur euismod varius dapibus. In vitae urna vitae felis efficitur placerat et in eros. Fusce imperdiet ornare metus, non sodales est placerat suscipit. Nulla convallis leo ante, nec pretium tortor vehicula non. Aenean pulvinar faucibus urna, ac molestie elit ornare vel. Morbi lacinia fringilla dui, quis volutpat diam lobortis in. Nam imperdiet maximus libero vel ultricies. Vestibulum condimentum, nisl nec fermentum tincidunt, ipsum dui ornare ligula, vitae euismod nisl sem non ipsum. In convallis iaculis neque, vel fermentum libero mollis id. Curabitur id eleifend tortor. Donec in massa tristique, mollis tellus accumsan, porta massa. Quisque vehicula pellentesque quam ac cursus.

Suspendisse nibh purus, pellentesque vel nibh a, dignissim feugiat orci. Cras ornare odio mollis, sodales quam eu, pretium elit. Cras non purus molestie, imperdiet dolor sed, vehicula sapien. Fusce pharetra venenatis commodo. Nunc lorem velit, molestie id posuere vel, iaculis id metus. Sed viverra porta scelerisque. Vivamus et efficitur tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi purus sem, elementum non turpis in, ullamcorper convallis ante. Sed iaculis nunc quis interdum consectetur. Donec varius, leo quis ullamcorper mollis, quam enim eleifend eros, et accumsan quam felis vitae libero.

![Mountain Landscape](https://source.unsplash.com/random/?mountains&width=600&height=600 "Mountains")

Ut consequat commodo hendrerit. Fusce tempor ipsum in ipsum iaculis, scelerisque finibus purus tincidunt. Suspendisse ultrices nisl sapien, nec rutrum risus molestie consectetur. Nunc sed pellentesque lacus. Ut pharetra orci id malesuada blandit. In sed hendrerit quam. Proin id finibus ligula. Aliquam maximus lacinia ligula, eu rutrum tellus. Curabitur fringilla sapien eget nulla fringilla sodales. Suspendisse odio velit, bibendum ut lectus ut, laoreet convallis quam. Mauris ut erat consectetur, porttitor neque et, sodales ligula. Proin at odio id eros tempus auctor eget eu ligula.

![Cityscape at Night](https://source.unsplash.com/random/?city,night&width=600&height=500 "City at Night")

![Cute Puppies](https://source.unsplash.com/random/?puppies&width=600&height=400 "Puppies")

Aenean eu lorem nisi. Ut condimentum quis urna volutpat porttitor. Suspendisse viverra nisl felis, ut placerat velit elementum ut. Nunc condimentum lobortis dolor at imperdiet. Nullam tincidunt velit arcu, a semper leo viverra nec. Maecenas fermentum euismod risus quis bibendum. Vestibulum finibus efficitur ex eget aliquet. Fusce pharetra, ligula ac posuere lobortis, metus libero pharetra purus, id ultricies mauris nibh at dui. In varius posuere erat et egestas.

Sed consequat leo magna, vitae pulvinar odio rhoncus ac. Proin felis nibh, rutrum non dapibus nec, eleifend id odio. Pellentesque nisl ligula, molestie id metus quis, volutpat pellentesque tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis lorem justo, vestibulum a iaculis a, placerat at odio. Nunc justo urna, ornare et rhoncus a, pellentesque in elit. Sed nibh odio, cursus non euismod sit amet, pulvinar nec risus. In ac consectetur mi.

![Beach Scenery](https://source.unsplash.com/random/?beach&width=100&height=200 "Beach")

![Delicious Food](https://source.unsplash.com/random/?food&width=300&height=200 "Food")
