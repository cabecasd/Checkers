import React from "react";
import './jogodamas.css'

// TODO:
//[x] - criar tabuleiro
//[x] - apresentar tabuleiro
//[x] - colocar as pecas no tabuleiro
//[x] - jogadas possiveis
//[ ] - jogadas possiveis damas
//[ ] - condicoes de vitoria
//[x] - botao reset

class JogoDasDamas extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tabuleiro: [
                ["c", "", "c", "", "c", "", "c", ""],
                ["", "c", "", "c", "", "c", "", "c"],
                ["c", "", "c", "", "c", "", "c", ""],
                ["", "x", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "c", ""],
                ["", "x", "", "x", "", "x", "", "x"],
                ["x", "", "x", "", "x", "", "x", ""],
                ["", "x", "", "x", "", "x", "", "x"],
            ],
            jogadorAtual: "x",
            jogadasPossiveis: [[], []],
            oponente: "c",
            posicaoDaPecaX: undefined,
            posicaoDaPecaY: undefined,
            comeu: false,
            xMorto: 0,
            cMorto: 0
        } //fim do state
        this.verificaPossiveisMovimento = this.verificaPossiveisMovimento.bind(this)
        this.verificaPossiveisComer = this.verificaPossiveisComer.bind(this)
    }//fim do constructor

    selecionaPeca(x, y) {
        // console.log("peca selecionada")
        if (this.state.jogadorAtual === this.state.tabuleiro[x][y]) {
            // console.log("peca selecionada é do jogador")
            this.setState({
                posicaoDaPecaX: x,
                posicaoDaPecaY: y
            })

            if (this.state.jogadorAtual === "c") {
                this.verificaPossiveis(x, y, +1)
            }

            else if (this.state.jogadorAtual === "x") {
                this.verificaPossiveis(x, y, -1)
            }
        }
    }
    verificaPossiveis(x, y, lado) {
        let possiveis = [[], []]

        possiveis = this.verificaPossiveisComer(x, y, lado, possiveis)
        // console.log("verificacao concluida, as possiveis para comer sao:")
        // console.log(possiveis)
        possiveis = this.verificaPossiveisMovimento(x, y, lado, possiveis)
        // console.log("verificacao concluida, as possiveis sao:")
        // console.log(possiveis)


        this.setState((state) => { state.jogadasPossiveis = possiveis }
        )
    }

    verificaPossiveisComer(x, y, lado, possiveis) {
        // console.log("a verificar jogadas possiveis de comer")
        let possiveis2 = possiveis

        //caso tenha uma peca a frente e a seguinte esteja vazia, pode-se comer, para a esquerda
        if (this.state.tabuleiro[x + lado][y - 1] === this.state.oponente && this.state.tabuleiro[x + lado * 2][y - 2] === "") {

            possiveis2[0] = [x + lado * 2, y - 2]
            // state.pecaAComerX = x + lado
            // state.pecaAComerY = y - 1
            // state.podeComerEsquerda = true
        }

        //o mesmo para a direita
        if (this.state.tabuleiro[x + lado][y + 1] === this.state.oponente && this.state.tabuleiro[x + lado * 2][y + 2] === "") {

            possiveis2[1] = [x + lado * 2, y + 2]
            // state.pecaAComerX = x + lado
            // state.pecaAComerY = y + 1
            // state.podeComerDireita = true
        }

        return possiveis2
    }

    verificaPossiveisMovimento(x, y, lado, possiveis) {
        // console.log("a verificar jogadas possiveis de mover")
        let possiveis2 = possiveis

        //verificar se pode mover para a casa da esquerda
        if (this.state.tabuleiro[x + lado][y - 1] === "") {
            possiveis2[0] = [x + lado, y - 1]
        }
        //o mesmo para a direita
        if (this.state.tabuleiro[x + lado][y + 1] === "") {
            possiveis2[1] = [x + lado, y + 1]
        }

        return possiveis2
    }

    movimento(x, y) {

        //jogadaspossiveis[0] <--- jogada possivel a esquerda
        //jogadaspossiveis[1] <--- jogada possivel a direita
        //jogadaspossiveis[n][0] <---- a linha da jogada possivel que estamos a ver
        //jogadaspossiveis[n][1] <---- a coluna da jogada possivel que estamos a ver
        if ((x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1])
            || (x === this.state.jogadasPossiveis[1][0] && y === this.state.jogadasPossiveis[1][1])) {


            //verifica se andou para a esquerda ou direita
            let eOD = x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1] ? "esquerda" : "direita"
            let comeuPeca = false

            //faz uma copia do tabuleiro
            let tabuleiro = [...this.state.tabuleiro];

            //guarda na variavel o que vai estar na posicao final
            let posicaoFinal = { ...this.state.tabuleiro[x][y] };
            posicaoFinal = `${this.state.jogadorAtual}`;

            //guarda na variavel o que vai estar na posicao da peca
            let posicaoInicial = { ...this.state.tabuleiro[this.state.posicaoDaPecaX][this.state.posicaoDaPecaY] }
            posicaoInicial = ""

            //substitui os valores das duas posicoes
            tabuleiro[x][y] = posicaoFinal;
            tabuleiro[this.state.posicaoDaPecaX][this.state.posicaoDaPecaY] = posicaoInicial

            comeuPeca = this.movimentoCome(x, y, tabuleiro)

            this.setState({ tabuleiro })

            // console.log("posicao atual onde estava")
            // console.log(`${this.state.posicaoDaPecaX},${this.state.posicaoDaPecaY}`)

            //final da jogada, troca o jogador se nao comeu ninguem
            if (!comeuPeca) {
                
                this.state.jogadorAtual === "x" ? this.setState({ jogadorAtual: "c" }) : this.setState({ jogadorAtual: "x" })
                this.state.oponente === "c" ? this.setState({ oponente: "x" }) : this.setState({ oponente: "c" })
                // console.log("troca de jogador")

                this.state.jogadorAtual === "x" ? this.setState((state) => {
                    state.cMorto +=  1
                }) : this.setState((state) => {
                    state.xMorto +=  1
                })
            }

            //final da jogada, tira as jogadas possiveis
            this.setState({
                jogadasPossiveis: [[], []],
            })
        }
    }

    movimentoCome(x, y, tabuleiro) {

        if (this.state.jogadorAtual === "x") {
            if (Math.abs(x - this.state.posicaoDaPecaX) > 1 && (x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1])) {
                // console.log("comeu com sucesso")
                tabuleiro[x + 1][y + 1] = ""

                return true
            }
            else if (Math.abs(x - this.state.posicaoDaPecaX) > 1 && (x === this.state.jogadasPossiveis[1][0] && y === this.state.jogadasPossiveis[1][1])) {
                // console.log("comeu com sucesso")
                tabuleiro[x + 1][y - 1] = ""
                
                return true
            }
        }

        if (this.state.jogadorAtual === "c") {
            if (Math.abs(x - this.state.posicaoDaPecaX) > 1 && (x === this.state.jogadasPossiveis[0][0] && y === this.state.jogadasPossiveis[0][1])) {
                // console.log("comeu com sucesso")
                tabuleiro[x - 1][y + 1] = ""

                return true
            }
            else if (Math.abs(x - this.state.posicaoDaPecaX) > 1 && (x === this.state.jogadasPossiveis[1][0] && y === this.state.jogadasPossiveis[1][1])) {
                // console.log("comeu com sucesso")
                tabuleiro[x - 1][y - 1] = ""

                return true
            }
        }
        return false
    }

    recomecar() {

        this.setState({
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
            posicaoDaPecaX: undefined,
            posicaoDaPecaY: undefined,
            comeu: false,
            xMorto: 0,
            cMorto: 0
        }
        )
    }


    render() {
        return (
            <section className="pagina">
                <section className="tabuleiro">
                    <table>
                        <tbody>
                            {
                                this.state.tabuleiro.map((linha, i) => (
                                    <tr key={i}>
                                        {

                                            // if (i === this.state.jogadasPossiveis[0][0] && j === this.state.jogadasPossiveis[0][1]) {

                                            // }
                                            linha.map((coluna, j) => ( // falta as classes para mudar a cor das jogadas possiveis

                                                
                                                coluna === "x" ? <td key={j} 
                                                onClick={
                                                    () => this.selecionaPeca(i, j)}
                                                    className={this.state.jogadorAtual ==="x" ? "branco" : ""}>
                                                <img src="Bartt.png"></img></td>

                                                : coluna === "c" ? <td key={j} className="preto" 
                                                onClick={
                                                    () => this.selecionaPeca(i, j)}
                                                    className={this.state.jogadorAtual ==="c" ? "preto" : ""}><img src="SideshowBobb.png"></img></td>

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
                <section className="sidebar">
                    <button onClick={() => this.recomecar()}>Recomeçar</button>
                    <p>{this.state.xMorto}</p>
                    <p>{this.state.cMorto}</p>
                </section>
            </section>


        )
    }
}

export default JogoDasDamas;
/*

    this.comeu = this.comeu.bind(this)
    comeu(x, y, eOD) {

        let direcaoVertical = this.state.tabuleiro[x][y] === "x" ? +1 : - 1
        let direcaoHorizontal = eOD === "esquerda" ? + 1 : - 1

        if (this.state.tabuleiro[x + direcaoVertical][y + direcaoHorizontal] === "") {
            console.log("comeu")
            return true
        } else if (this.state.tabuleiro[x + direcaoVertical][y + direcaoHorizontal] === "") {
            console.log("comeu")
            return true
        }

        return false

    }




    if(Math.abs(x - this.state.posicaoDaPecaX) > 1 && Math.abs(y - this.state.posicaoDaPecaY) > 1) {
             // console.log("entrou if 1")

            if (this.state.tabuleiro[x][y] === "c") {
                // console.log("entrou if 2")
                this.verificaPossiveisComer(x, y, +1)
                if(this.state.podeComerEsquerda || this.state.podeComerDireita) {

                    // console.log("entrou if 3")
                    return true
                }
            }
            if (this.state.tabuleiro[x][y] === "x") {
                // console.log("entrou if 2")
                this.verificaPossiveisComer(x, y, -1)
                if(this.state.podeComerEsquerda || this.state.podeComerDireita) {
                    // console.log("entrou if 3")
                    return true
                }
            }

        } return false









        com a ideia de rodar o tabuleiro
        as jogadas possiveis são sempre a x+1 y-1 e x+1 y-1

        ["      ","Peça","      "],
        ["pssvel","    ","pssvel"],
        ["      ","    ","      "],

        exclui-se depois as possiveis dependendo se ha uma peca nessa posicao ou nao



        if()
                console.log("wahoo")
                return true
            this.state.jogadasPossiveis[0] !== undefined || this.state.jogadasPossiveis[1] !== undefined



                this.setState({
            comeu: true
        })










        this.rodaTabuleiro = this.rodaTabuleiro.bind(this)
    rodaTabuleiro(tabuleiro) {

        let novoTabuleiro = []
        for(let i = tabuleiro.length - 1; i >= 0; i--) {
            let linhaTemp = []
            novoTabuleiro.push(linhaTemp)

            for(let j = tabuleiro.length - 1; j >= 0; j--) {
                linhaTemp.push(tabuleiro[i][j])

            }
        }

        this.setState(state => {
            state.tabuleiro = novoTabuleiro
        })

    }
*/
