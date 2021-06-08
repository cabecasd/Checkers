import React from "react";
import './jogodamas.css'

// TODO:
//[x] - criar tabuleiro
//[x] - apresentar tabuleiro
//[x] - colocar as pecas no tabuleiro
//[x] - jogadas possiveis
//[ ] - jogadas possiveis damas
//[ ] - condicoes de vitoria
//[ ] - botao reset
class JogoDasDamas extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tabuleiro: [
                ["c", "", "c", "", "c", "", "c", ""],
                ["", "c", "", "c", "", "c", "", "c"],
                ["c", "", "c", "", "c", "", "c", ""],
                ["", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", ""],
                ["", "x", "", "x", "", "x", "", "x"],
                ["x", "", "x", "", "x", "", "x", ""],
                ["", "x", "", "x", "", "x", "", "x"],
            ],
            jogadorAtual: "x",
            jogadasPossiveis: [[], []],
            oponente: "c",
            posicaoDaPecaX: 0,
            posicaoDaPecaY: 0,
            pecaAComerX: 0,
            pecaAComerY: 0,
            podeComer: false,
        }

        this.verificaPossiveis = this.verificaPossiveis.bind(this)


    }
    selecionaPeca(x, y) {

        if (this.state.jogadorAtual === this.state.tabuleiro[x][y]) {

            this.setState({
                posicaoDaPecaX: x,
                posicaoDaPecaY: y
            })
            if (this.state.jogadorAtual === "c") {
                this.verificaPossiveis(x, y, +1)
                console.log("selecionaPeca")
 
            }
            else if (this.state.jogadorAtual === "x") {
                this.verificaPossiveis(x, y, -1)
                console.log("selecionaPeca")
            }
        }

        //se a casa possivel a esquerda estiver desocupada, guardar como um possivel movimento para esta peça

    }
    /*

this.classList.add('highlight_sq');
board = board.map(function(row){return row.map(function(cell){return cell.replace(pecaAtual, " ")});});


[ ] - mover peças
[ ] - mostrar as jogadas possiveis com cores
[ ] - 
*/

    //ja temos as jogadas possiveis
    //como e que se regista uma jogada
    // !!outro onclick???????

    verificaPossiveis(x, y, lado) {
        this.setState(state => {
            state.jogadasPossiveis = [[], []]
        })
        //verificar se se pode descer para a linha de baixo e para a coluna à esquerda

        if (this.state.tabuleiro[x + lado][y - 1] === "") {
            this.setState(state => {
                state.jogadasPossiveis[0] = [x + lado, y - 1]

            })
        } //o mesmo para a direita
        if (this.state.tabuleiro[x + lado][y + 1] === "") {
            this.setState(state => {
                state.jogadasPossiveis[1] = [x + lado, y + 1]

            })




        } //caso tenha uma peca a frente e a seguinte esteja vazia, pode-se comer, para a esquerda
        if (this.state.tabuleiro[x + lado][y - 1] === this.state.oponente && this.state.tabuleiro[x + lado * 2][y - 2] === "") {
            this.setState(state => {
                state.jogadasPossiveis[0] = [x + lado * 2, y - 2]
                state.pecaAComerX = [x + lado]
                state.pecaAComerY = [y - 1]
                state.podeComer = true

            })
        } //o mesmo para a direita
        if (this.state.tabuleiro[x + lado][y + 1] === this.state.oponente && this.state.tabuleiro[x + lado * 2][y + 2] === "") {
            this.setState(state => {
                state.jogadasPossiveis[1] = [x + lado * 2, y + 2]
                state.pecaAComerX = [x + lado]
                state.pecaAComerY = [y + 1]
                state.podeComer = true
            })
        }

    }

    movimento(x, y) {

        // jogadaspossiveis[0] <--- jogada possivel a esquerda
        //jogadaspossiveis[1] <--- jogada possivel a direita
        //jogadaspossiveis[n][0] <---- a linha da jogada possivel que estamos a ver
        //jogadaspossiveis[n][1] <---- a coluna da jogada possivel que estamos a ver
        if ((x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1]) 
        || (x === this.state.jogadasPossiveis[1][0] && y === this.state.jogadasPossiveis[1][1])) {
            
            let items = [...this.state.tabuleiro];
            
            let item = { ...this.state.tabuleiro[x][y] };
            
            item = `${this.state.jogadorAtual}`;
            let item2 = ""
            if (this.state.podeComer) {
                items[this.state.pecaAComerX][this.state.pecaAComerY] = ""
                this.setState(state => {
                    state.comeu = true
                })
            } else {
                this.setState(state => {
                    state.comeu = false
                })
            }
            
            items[x][y] = item;
            items[this.state.posicaoDaPecaX][this.state.posicaoDaPecaY] = item2

            this.setState({ items });
            
            
            //final da jogada, troca o jogador
            if(this.state.comeu) {
                this.state.jogadorAtual === "x" ? this.setState({ jogadorAtual: "c" }) : this.setState({ jogadorAtual: "x" })
            }
            

            //final da jogada, tira as jogadas possiveis
            this.setState({
                jogadasPossiveis: [[],[]]
            })
        }
    }


    render() {
        return (
            <section className="tabuleiro">
                <h2>CHECKERS</h2>
                <table>
                    <tbody>
                        {
                            this.state.tabuleiro.map((linha, i) => (
                                <tr key={i}>
                                    {

                                        // if (i === this.state.jogadasPossiveis[0][0] && j === this.state.jogadasPossiveis[0][1]) {

                                        // }
                                        linha.map((coluna, j) => ( // falta as classes para mudar a cor das jogadas possiveis

                                            //className={a ? "possivel" : null}
                                            coluna === "x" ? <td key={j} className="preto" onClick={
                                                () => this.selecionaPeca(i, j)}>x</td>
                                                : coluna === "c" ? <td key={j} className="branco" onClick={
                                                    () => this.selecionaPeca(i, j)}>c</td>

                                                    : <td key={j} className={
                                                        i === this.state.jogadasPossiveis[0][0] && j === this.state.jogadasPossiveis[0][1] ? "possivel"
                                                        : i === this.state.jogadasPossiveis[1][0] && j === this.state.jogadasPossiveis[1][1] ? "possivel" 
                                                        : ""

                                                    } onClick={() => this.movimento(i, j)}></td>

                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        )
    }
}

export default JogoDasDamas;



    // this.rodaTabuleiro = this.rodaTabuleiro.bind(this)
    // rodaTabuleiro(tabuleiro) {

    //     let novoTabuleiro = []
    //     for(let i = tabuleiro.length - 1; i >= 0; i--) {
    //         let linhaTemp = []
    //         novoTabuleiro.push(linhaTemp)

    //         for(let j = tabuleiro.length - 1; j >= 0; j--) {
    //             linhaTemp.push(tabuleiro[i][j])

    //         }
    //     }

    //     this.setState(state => {
    //         state.tabuleiro = novoTabuleiro
    //     })

    // }




/*
        com a ideia de rodar o tabuleiro
        as jogadas possiveis são sempre a x+1 y-1 e x+1 y-1

        ["      ","Peça","      "],
        ["pssvel","    ","pssvel"],
        ["      ","    ","      "],

        exclui-se depois as possiveis dependendo se ha uma peca nessa posicao ou nao

        */
