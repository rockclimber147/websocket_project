import { Game } from "./classes/Game.js"
import { Player } from "../../shared/Entities.js"
import { gameIoMessageTypes } from "../../shared/Enums.js"

const socket = window.io()

const game = new Game()

socket.on(gameIoMessageTypes.UPDATE_PLAYERS, (players: Player[]) => {
  const playerMap: Map<string, Player> = new Map()
  for (const playerData of players) {
    const player = new Player(
      playerData.x,
      playerData.y,
      playerData.radius,
      playerData.color,
      playerData.id
    )
    playerMap.set(player.id, player)
  }

  game.updatePlayers(playerMap);
})