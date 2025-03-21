import { Game } from "./classes/Game.js"
import { Player } from "./classes/Entities.js"
import { gameIoMessageTypes } from "../../shared/Enums.js"

const socket = window.io()

const game = new Game()

socket.on(gameIoMessageTypes.UPDATE_PLAYERS, (players: Player[]) => {
  console.log("In updatePlayers")
  console.log(players)
  for (const playerData of players) {
    const player = new Player(
      playerData.x,
      playerData.y,
      playerData.radius,
      playerData.color,
      playerData.id
    )
    game.addPlayer(player)
  }
})