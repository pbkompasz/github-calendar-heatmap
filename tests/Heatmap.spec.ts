import { beforeAll, describe, expect, it, test, } from 'vitest'
import { Heatmap2, HeatmapDraw } from '../heatmap/heatmap'

let heatmap: Heatmap2;
let frontend: HeatmapDraw;

beforeAll(() => {
  heatmap = new Heatmap2(new Date(), []);
  frontend = new HeatmapDraw(heatmap);
})

// The two tests marked with concurrent will be run in parallel
describe('Heatmap backend', () => {
  test('Create heatmap', async () => {
    heatmap = new Heatmap2(new Date(), [],);
    if (!heatmap) {
      throw new Error();
    }
    expect('something').toBe('something');
  })

  test('Reinit heatmap', async () => {

  })

  test('Update heatmap', async () => {

  })

  test.each([
    'day',
    'week',
    'month',
  ])('Highlight %s', async () => {
    
  })

})

describe('Heatmap frontend', () => {

  test('Render empty heatmap', async () => {
    // heatmap.render();
  })

  test('Render maximal size heatmap', async () => {

  })

  test.skip('Force update heatmap', async () => {
    // TODO Represent the state w/ a numeric value
    const currentState = frontend.getState();
    await heatmap.addEvent(new Date(), {
      title: 'temp',
      value: 10,
    });
    expect(frontend.getState()).toBeGreaterThan(currentState);
  })

  test('Hover event', async () => {

  })

})

