# MacBook M1 Config
- download XCode (which takes a pretty long time)
- install Chrome
- (once XCode installed)
- install Homebrew
- install n (via homebrew) (`brew install n`)
- install node via n (`n i 14`)
- install pyenv (via homebrew) (`brew install pyenv`)
  * after installation, add `https://github.com/pyenv/pyenv` into `.zprofile` [link](https://github.com/pyenv/pyenv)
- install python `3.8.6` via pyenv [link](https://laict.medium.com/install-python-on-macos-11-m1-apple-silicon-using-pyenv-12e0729427a9)
- install VSCode
  * use VSCode's terminal to perform git clone, it will help you to set the credential
  * install plugins: `vim`, `eslint`, `prettier`, `python` (PyLance)
  * enable key repeat `defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false` [link](https://stackoverflow.com/questions/39972335/how-do-i-press-and-hold-a-key-and-have-it-repeat-in-vscode)
- customize zsh, for example, add `export PS1='%1d $ '` into `~/.zshrc` [link](https://superuser.com/questions/1108413/zsh-prompt-with-current-working-directory/1108504)
- install XCode (because it will take a long time to download)
  * then, make sure `Command Line Tools` is installed (Preference -> Locations)
- install Cocoapad `sudo gem install cocoapods`
- install Android studio (find the M1 version)
  * remember to open SDK manager and download related sdk / sdk build tools
- react native specific [link](https://reactnative.dev/docs/environment-setup)
  * `brew install watchman`
  * `brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`
  * Add some android related path:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
## Backend
- install `poetry` (should be for pyenv's global python) [official link](https://python-poetry.org/docs/)
`curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -`
- copy `.aws` for `credentials`
- copy some sample `.env` for api projects
- install `docker desktop` from [here](https://docs.docker.com/desktop/mac/apple-silicon/)


## Trouble shooting
react-native ios in m1 error   
  - pod install error SDK "iphoneos" cannot be located https://stackoverflow.com/a/62992835/13797221
  - Xcode cannot initial nsarray，新rn可解決，就rn可以workaround https://github.com/facebook/react-native/issues/31412
  - React-native-apple-authentication Duplicate interface https://github.com/invertase/react-native-apple-authentication/issues/130
  - fire-base 似乎還沒支援m1 所以用rosseta 開Xcode https://stackoverflow.com/a/65744082/13797221

