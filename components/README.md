# COMPONENTS

## Alert

Componente responsável por exibir mensagens para o usuário de forma dinâmica usando **parametrização** e **estilização personalizada**.


### Como usar?

Para usar o alert em qualquer lugar da aplicação, basta chamar o objeto global *$notifier* e invocar a função *showMessage* passando 
um objeto com as duas propriedades de parametro, type e message.

```
        <script>
            export default {
                ...
                methods: {
                    showSnackbar () {
                    this.$notifier.showMessage({ type: 'success', message: 'Boa! deu certo' })
                    }
                }
                ...
            }
        </script>
```

### Opções

**Parâmetros** Obs: *A parametrização do componente está considerando o valor alterado na store 'snackbar'*

*type*
- 'success'
- 'error'
- 'warning'
- 'custom'
- <N/D>

*message*
- string
- <N/D>
