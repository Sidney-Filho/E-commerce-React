declare module 'react-stars' {
    import { Component } from 'react';
  
    interface ReactStarsProps {
      count: number;
      value: number;
      onChange?: (newValue: number) => void;
      size?: number;
      color?: string;
      activeColor?: string;
      edit?: boolean;
      isHalf?: boolean;
    }
  
    export default class ReactStars extends Component<ReactStarsProps> {}
  }

  declare module 'react-stars' {
    const ReactStars: any;
    export default ReactStars;
  }