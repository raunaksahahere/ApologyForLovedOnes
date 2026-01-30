import turtle

def run_turtle_animation():
    try:
        # Set up the screen
        screen = turtle.Screen()
        screen.bgcolor("black")
        screen.title("Oishi")
        
        # Set up the turtle
        pen = turtle.Turtle()
        pen.color("red")
        pen.fillcolor("red")
        pen.speed(3)
        pen.width(3)
        
        # Function to draw the heart shape
        def draw_heart():
            pen.begin_fill()
            pen.left(140)
            pen.forward(180)
            pen.circle(-90, 200)
            pen.left(120)
            pen.circle(-90, 200)
            pen.forward(180)
            pen.end_fill()
        
        # Function to write text
        def write_text(name):
            pen.up()
            pen.setpos(-70, 50) # Position to center text
            pen.down()
            pen.color("white")
            pen.write(name, font=("Arial", 30, "bold"))
        
        # Draw the elements
        draw_heart()
        write_text("Oishi")
        
        # Hide turtle and finish
        pen.hideturtle()
        turtle.done()
    except turtle.Terminator:
        pass # Handle case where window is closed early

if __name__ == "__main__":
    run_turtle_animation()
