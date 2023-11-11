import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'sensus-icon-spin',
  styleUrl: 'sensus-icon-spin.scss',
  shadow: true,
})
export class SensusIconSpin {
  render() {
    return (
      <Host>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle class="spinner_nOfF" cx="4" cy="12" r="3"/><circle class="spinner_nOfF spinner_fVhf" cx="4" cy="12" r="3"/><circle class="spinner_nOfF spinner_piVe" cx="4" cy="12" r="3"/><circle class="spinner_nOfF spinner_MSNs" cx="4" cy="12" r="3"/></svg>
      </Host>
    );
  }
}
