import {Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'sensus-score',
  styleUrl: 'sensus-score.scss',
  shadow: true,
})
export class SensusScore {
  @Prop() value: number;

  render() {
    return (
      <i class={{ score: true, [`score-${this.value}`]: true }}>{ this.value }</i>
    );
  }
}
