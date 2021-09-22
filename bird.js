
class Bird {
    constructor() {
        this.y = height / 2;
        this.x = 64;

        this.gravity = 0.6;
        this.lift = -8;
        this.velocity = 0;

        this.icon = midSprite;
        this.width = 50;
        this.height = 45;
    }

    show() {
        // draw the icon CENTERED around the X and Y coords of the bird object
        image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    up() {
        this.velocity = this.lift;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y >= height - this.height / 2) {
            this.y = height - this.height / 2;
            this.velocity = 0;
        }

        if (this.y <= this.height / 2) {
            this.y = this.height / 2;
            this.velocity = 0;
        }
    }
}