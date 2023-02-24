import { useEffect, useRef, useState } from "react"
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/canvas"

const useImagePainter = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | null | undefined>()
    const [color, setColor] = useState('#11111')
    const [lineWidth, setLineWidth] = useState(1)
    const [isPainting, setIsPainting] = useState(false)
    const [currentImg, setCurrentImg] = useState('')

    useEffect(() => {
        setCanvas(canvasRef?.current)
        setContext(canvas?.getContext('2d'))
    }, [canvasRef, canvas])

    const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
        if (context) context.strokeStyle = color
    }

    const onChangeLineWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLineWidth(+e.target.value)
        if (context) context.lineWidth = +e.target.value
    }

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        if (!context || !isPainting || !canvas) return

        const posX = e.pageX - canvas.offsetLeft
        const posY = e.pageY - canvas.offsetTop
        context.lineTo(posX, posY)
        context.stroke()

    }

    const onMouseUp = () => {
        context?.beginPath()
        setIsPainting(false)
    }
    const onMouseDown = () => setIsPainting(true)

    const handleClearCanvas = () => {
        if (context) {
            context.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0)
            setCurrentImg('')
        }
    }

    const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(!canvas || !context) return
        handleClearCanvas()

        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                context.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
            img.src = event?.target?.result as any
        }
        if(e.target.files?.length){
            reader.readAsDataURL(e.target.files[0])
            setCurrentImg(e.target.value.toString())
        }

    }

    return {
        canvasRef,
        onMouseMove,
        onMouseUp,
        onMouseDown,
        lineWidth,
        onChangeLineWidth,
        onChangeColor,
        handleClearCanvas,
        onSelectImage,
        currentImg,
    }

}

export default useImagePainter