//two stacks, one for the undo e the other for the redo
//the pixels drawn until I released the mouse are put in the undo stack
//if i press ctrl + z, i select the pixels at the top of the undo stack, and remove then from the canvas
//after that, i put theses pixels in the redo stack
//if i press ctrz + y, i select the pixels at the top of the redo stack, and add then to the canvas
//after that, i put these pixels in the undo stack

import {Stack} from './Helpers/Stack.js';

const cleanDraw = (draw) =>{

    const clean = [];
    
    const map = new Map();

    for(let i = 0;i<draw.length;i++)
    {
        if(draw[i])
        {
            for(let j = 0;j<draw[i].length;j++)
            {
                if(!map.get(draw[i][j].x1.toString() + draw[i][j].y1.toString()))
                {
                    map.set(draw[i][j].x1.toString() + draw[i][j].y1.toString(),true);
                    clean.push(draw[i][j]);
                }
            }
        }
            
    }

    return clean;


}

export const undoStack = new Stack();
export const redoStack = new Stack();


export const undoLastDraw = (pixels,defaultPenSize,c) => {

    if(undoStack.isEmpty())return;

    const draw = undoStack.top();
    undoStack.pop();
    const clean = cleanDraw(draw);

    for(let pixel of clean)
    {
        const currPixel = pixels[pixel.i][pixel.j];
            currPixel.numOfPaints--;
            if(currPixel.numOfPaints <= 0){
                c.clearRect(pixel.x1,pixel.y1,defaultPenSize,defaultPenSize);
                currPixel.color = "#FF000000";
                currPixel.painted = false;
            }else
            {
                currPixel.colorStack.pop();
                const previousColor = currPixel.colorStack.top();
                currPixel.color = previousColor;
                c.fillStyle = previousColor;
                c.fillRect(currPixel.x1,currPixel.y1,defaultPenSize,defaultPenSize);
            }
            if(currPixel.numOfPaints < 0)currPixel.numOfPaints = 0;
    }
    

}
