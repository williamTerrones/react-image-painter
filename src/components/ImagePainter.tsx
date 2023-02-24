import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants/canvas"
import useImagePainter from "../hooks/useImagePainter"
import SelectColor from "./SelectColor"
import SelectImage from "./SelectImage"
import SelectRange from "./SelectRange"

const ImagePainter = () => {

    const {
        canvasRef, onMouseMove,
        onMouseDown, onMouseUp,
        onChangeColor, currentImg,
        lineWidth, onChangeLineWidth,
        handleClearCanvas, onSelectImage
    } = useImagePainter()

    return (
        <div className="flex flex-col">
            <SelectImage onChange={onSelectImage}
                label={!currentImg ? 'Seleccione una imagen para subir' : currentImg} />
            <div className="flex justify-between flex-wrap"
                style={{
                    marginBottom: '10px'
                }} >
                <SelectColor onChange={onChangeColor} />
                <SelectRange value={lineWidth} onChange={onChangeLineWidth} />
                <button onClick={() => handleClearCanvas()}>
                    Borrar
                </button>
            </div>
            <canvas ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                onMouseMove={onMouseMove}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                style={{
                    border: '1px solid black'
                }} />
            <br />

        </div>
    )
}

export default ImagePainter