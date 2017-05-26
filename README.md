[Pull Favors](https://chrome.google.com/webstore/detail/pull-favors/eekfnkibgmemnnbbmdglmjabjdfdjglj?hl=en)
is a Chrome extension that re-orders your RSpec and RSpec-compatible pull requests so
that they are more readable.

It places feature-specs first.

It places other specs next to the files that they test.

## Before

Alphabetical Order:

![image](https://cloud.githubusercontent.com/assets/1406554/13355568/0f6e4992-dc6f-11e5-96b9-36b21154402f.png)

## After

Feature specs first.
Other specs paired with the files that they test.

![image](https://cloud.githubusercontent.com/assets/1406554/13355539/e42b537e-dc6e-11e5-85d1-a4a0e9733ed6.png)


## Caveats

It expects feature specs to be in `spec/features`.

Other specs should correspond to the files they test in the following way:

`app/folder/file.rb` => `spec/folder/file_spec.rb`

Usage
----

1. [Install Pull Favors](https://chrome.google.com/webstore/detail/pull-favors/eekfnkibgmemnnbbmdglmjabjdfdjglj) from the Chrome Webstore.
2. Visit a pull request which conforms to the standard, outlined above,
   i.e. https://github.com/18F/C2/pull/937/files.
