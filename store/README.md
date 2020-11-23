# STORE

## store/snackbar

**Store para armazenar temporareamente as informações de snackbar

#### Estado

```
    state {
        type: '',  // Tipo da mensagem
        message: '' // Mensagem
    }

```

#### Mutações

```
    mutations = {
        // Muatation para alterar os dados do alert, quando essa mutation é invocada o alert é exebido.
        showMessage(state, payload) {
            state.type = payload.type
            state.message = payload.message
        }
    }

```




