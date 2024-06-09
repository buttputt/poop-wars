namespace SpriteKind {
    export const Ball = SpriteKind.create()
    export const Booth = SpriteKind.create()
    export const Mouse = SpriteKind.create()
    export const Crosshair = SpriteKind.create()
    export const Moon = SpriteKind.create()
    export const StatusBar = SpriteKind.create()
    export const Text = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let projectile: Sprite = null
let ship: Sprite = null
let asteroids = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . e . . . . . . . 
    . . . . . . . e f . . . . . . . 
    . . . . . . . f e e . . . . . . 
    . . . . . . f f f . . . . . . . 
    . . . . . . e e f e e . . . . . 
    . . . . . . f f e e e . . . . . 
    . . . . . f e f f f . . . . . . 
    . . . . e e e e e e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . e e . . . . . . . 
    . . . . . . . e e . . . . . . . 
    . f . . . . e e . . . . . f f . 
    . f f . . . e e e e . . f f . . 
    . . f f . e e e e e . f f . . . 
    . . . f e f e e f e e f . . . . 
    . . e e e e e e e e e e . . . . 
    e e e e e f f f f e e e e e . . 
    . . e e e e e e e e e e e . . . 
    . . e e e e e e e e e . . . . . 
    . . e e e e e e e e e e . . . . 
    . . . . f . . . . f . . . . . . 
    . . . . f . . . . f . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . e . . e . e . . . . . 
    . . . . e e . e . . e . . . . . 
    . . . . . e . e e . . . . . . . 
    . . . . f e e e e e . e . f . . 
    . . . . . . e e e e e e . . . . 
    . . . . . . e e . e e . . . . . 
    . . . . . . e e . e . . . . . . 
    . . . . . e e e e e . . . . f . 
    . . . f f e f e f e e f f f . . 
    . . f f . e e e e e e . . . . . 
    . . . . . e e e e e . . . . . . 
    . . . . . f f e e f . . . . . . 
    . . . . . f . . . f f . . . . . 
    . . . . f f . . . . f . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . f . . . e . e e . . . . . 
    . . . f . e e e e e e e . . . . 
    . . . . f e e e e e . . . f f f 
    f f . . . e e e e e . . f . . . 
    . f f . . e e e e e e f . . . e 
    . . . f e e e e e e e e . . . . 
    . . . . e f e e e e f e e e e . 
    . e . e e e e e e e e e e e e . 
    . . . e e f f f f f e e e f . . 
    f f f e e f e e e f f e e e f f 
    e . . e e f f f e f f e e e . . 
    . . e e e e e f f e e e e . . . 
    . e e e e e e e e e f f . . . . 
    e e e e e e e e e e . f f . . . 
    e e e e e e e e e e . . f f . . 
    e e e e . . e e . . . . . f . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . 6 . . . . e . . e . e . . . 
    . . 6 . . . e e e . . . . . . . 
    . 6 6 6 . . e e e e . . e . . . 
    . 6 6 6 . e f e f e . . . . . . 
    . 6 6 6 . e e e e e . . . . . . 
    . . 6 . . e f f f e . . . . . . 
    . . 6 f f e e e e e f f f . . . 
    . . 6 . . e e e e e . . . . . . 
    . . 6 . . e e e e e . . . . . . 
    . . 6 . . e e e e e . . . . . . 
    . . 6 . . e e e e e . . . . . . 
    . . . . f f e e e f f f . . . . 
    . . . . f . e e e . . f . . . . 
    . . . f f . e e e . . f . . . . 
    . . . . . . . . . . . f . . . . 
    `,
img`
    . . e e . . . . . . e e . . . . 
    . . e e . . . . . . e e . . . . 
    . e e e e . e e e . e e e . . . 
    . e e e e . e e e . e e e . . . 
    . . . e . . e e e e . e . . . f 
    . . . e . . e f e f . e . . . . 
    e . . e . e e e e e . e . . . . 
    . e . e . e f f f e . e . e . . 
    . e e e e e e e e e e e e e e . 
    . e . e . . e e e . . e . . e . 
    . e . e . . e e e . . . . . . . 
    . . . . . . . e . . . . . . . . 
    . . . . . . . e . . . . . e . . 
    . . f . . . . e . . f . . . . . 
    . . . . . . . e . . . . . . . . 
    . . . . . . . e . . . . . . . . 
    `
]
ship = sprites.create(sprites.space.spaceRedShip, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
