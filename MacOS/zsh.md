# zprofile
```
eval "$(/opt/homebrew/bin/brew shellenv)"
eval "$(pyenv init --path)"
```
(first line is for homebrew, second is for python)

# zshrc
```
export PS1='%1d $ '
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

export PATH="$HOME/.poetry/bin:$PATH"
```

(first line is to make cmdline prompt shorter, last line is for python's npm like tool)
