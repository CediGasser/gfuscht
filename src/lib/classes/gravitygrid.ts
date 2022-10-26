export class Particle {
	public size: number
	public frame: number
	public x: number
	public y: number
	public color: string = 'green'

	constructor (x, y, size, frame) {
		this.x = x
		this.y = y
		this.size = size
		this.frame = frame
	}	

	draw (ctx) {
		ctx.fillStyle = this.color
		let gap = (this.frame - this.size) / 2
		ctx.fillRect(this.x + gap, this.y + gap, this.size, this.size)
	}
}

export class Effect {
	public canvas: HTMLCanvasElement
	public width: number
	public height: number
	public res: number = 30
	public particles: Particle[] = []
	public movingParticle: MovingParticle
	public particleSize: number
	public sensorDistance: number

	constructor (canvas, width, height, particleSize, sensorDistance) {
		this.canvas = canvas
		this.width = width
		this.height = height
		this.particleSize = particleSize
		this.sensorDistance = sensorDistance
	}

	setup () {
		let rows = this.height / this.res
		let cols = this.width / this.res

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let p = new Particle(j * this.res, i * this.res, this.particleSize, this.res)
				this.particles.push(p)
			}
		}

		this.movingParticle = getRandomMovingParticle(this.width, this.height, this.sensorDistance)
		this.movingParticle.color = 'red'

		console.log(this.movingParticle)
	}

	update () {
		this.movingParticle.update()
		let x1 = this.movingParticle.x
		let y1 = this.movingParticle.y

		this.particles.forEach(p => {
			let x2 = p.x + p.frame/2
			let y2 = p.y + p.frame/2
			let vx = x2 - x1
			let vy = y2 - y1
		
			let d = Math.sqrt(vx * vx + vy * vy)
 			
			let maxGrowth = this.res - this.particleSize
			if (d < this.sensorDistance) {
				p.size = this.res - maxGrowth * d / this.sensorDistance 
			} else {
				p.size = this.particleSize
			}
		})

		// create new moving Particle if current out of bounds
		if (x1 < -this.sensorDistance || x1 > this.width + this.sensorDistance 
		 || y1 < -this.sensorDistance || y1 > this.height + this.sensorDistance) {
			 this.movingParticle = getRandomMovingParticle(this.width, this.height, this.sensorDistance)
		}
		
	}

	draw () {
		let ctx = this.canvas.getContext('2d')

		ctx.clearRect(0, 0, this.width, this.height)

		this.particles.forEach(p => p.draw(ctx))
		this.movingParticle.draw(ctx)
	}
}

export class MovingParticle extends Particle {
	public velocityX: number
	public velocityY: number

	constructor (x, y, size, frame, velocityX, velocityY) {
		super(x, y, size, frame)
		this.velocityX = velocityX
		this.velocityY = velocityY
	}

	update () {
		this.x += this.velocityX / 100
		this.y += this.velocityY / 100
	}

	draw (ctx) {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, 1, 1)
	}
}

function getRandomMovingParticle(width, height, sensorDistance) {
	let left = -(sensorDistance)
	let top = -(sensorDistance)
	let right = width + sensorDistance
	let bottom = height + sensorDistance

	let x = Math.random() * width
	let y = Math.random() * height
	
	let velocityX = Math.random() * 400
	let velocityY = Math.random() * 400

	if (rand([true, false])) {
		x = rand([left, right])

		if (x === right) {
			velocityX *= -1
		}
	} else {
		y = rand([top, bottom])

		if (y === bottom) {
			velocityY *= -1
		}
	}

	return new MovingParticle(x, y, 1, 1, velocityX, velocityY)
}

function rand(array) {
	let index = Math.floor(Math.random() * array.length)
	return array[index]
}
