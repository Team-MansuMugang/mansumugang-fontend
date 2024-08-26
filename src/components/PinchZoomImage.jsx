import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const PinchZoomImage = ({ className, src, alt, height = 'auto' }) => {
  return (
    <TransformWrapper
      wheel={{ step: 0.1 }} // PC 환경에서 휠로 확대/축소 가능
    >
      <TransformComponent>
        <img
          className={className}
          src={src}
          alt={alt}
          style={{ width: 'auto', height: height, touchAction: 'none' }}
        />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default PinchZoomImage;
