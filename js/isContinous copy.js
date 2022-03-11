/**
 * description:
 * This is an object used to determine if the timeline is continuous:
 * We have a series of time points,just like countless water droplets in different positions
 * We can give the radius of a water droplet
 * Yes, when the radius is large enough, the water droplets will merge into large water droplets
 * We use this object to judge which times are consecutive
 */

 export class Droplet extends Array {
  constructor(radius) {
    super();

    if (!Number.isFinite(radius)) {
      throw new Error('radius expected a valid number');
    }

    this.radius = radius;
  }

  minValue = -Infinity;

  maxValue = Infinity;

  radius = null;

  getRange() {
    if (!Number.isFinite(this.minValue) || !Number.isFinite(this.maxValue)) {
      return null;
    }

    return [this.minValue, this.maxValue];
  }

  push(value) {
    if (!Number.isFinite(value)) {
      return;
    }

    /**
     * description
     * Only calculate the range each time the value is updated, this avoids overcomputation
     */
    if (value >= this.minValue - this.radius && value <= this.maxValue + this.radius) {
      if (!this.includes(value)) super.push(value);

      if (this.length === 1) {
        this.minValue = value;
        this.maxValue = value;
      } else {
        if (value < this.minValue) {
          this.minValue = value;
        } else if (value > this.maxValue) {
          this.maxValue = value;
        }
      }

      return true;
    }

    return false;
  }

  clear() {
    this.length = 0;
    this.minValue = -Infinity;
    this.maxValue = Infinity;
  }

  absorb(d) {
    if (this.radius !== d.radius) {
      throw new Error('can not absord the droplet with diff radius');
    }

    const isOverlapping =
      (this.maxValue >= d.minValue && this.minValue <= d.minValue) ||
      (this.minValue <= d.maxValue && this.minValue >= d.minValue);
    const isClose =
      (d.minValue - this.maxValue > 0 && d.minValue - this.maxValue < this.radius) ||
      (this.minValue - d.maxValue > 0 && this.minValue - d.maxValue < this.radius);

    if (isOverlapping || isClose) {
      this.minValue = Math.min(this.minValue, d.minValue);
      this.maxValue = Math.max(this.maxValue, d.maxValue);

      d.clear();

      return true;
    }

    return false;
  }
}

class Droplets {
  pool = [];

  constructor(radius) {
    if (!Number.isFinite(radius)) {
      throw new Error('radius expected a valid number');
    }

    this.radius = radius;
  }

  push(value) {
    if (!Number.isFinite(value)) {
      return;
    }

    if (this.pool.length === 0) {
      this.pool.push(new Droplet(this.radius));
    }

    const container = [];
    for (const index in this.pool) {
      const droplet = this.pool[index];
      if (droplet.push(value)) {
        container.push(index);
      }
    }

    // if fail, create a new droplet
    if (container.length === 0) {
      const droplet = new Droplet(this.radius);
      droplet.push(value);
      this.pool.push(droplet);

      return;
    }

    // if more than one droplet success pushed this value, means we need to connect those droplets
    if (container.length > 1) {
      this.pool[container[0]].absorb(this.pool[container[1]]);

      this.pool.splice(container[1], 1);
    }
  }

  clear() {
    for (const d of this.pool) {
      d.clear();
    }

    this.pool.length = 0;
  }

  isContinuous({ start, end }) {
    if (start > end || !Number.isFinite(start) || !Number.isFinite(end)) {
      return false;
    }

    if (start === end) return true;

    for (const item of this.pool) {
      if (item.minValue <= start && item.maxValue >= end) return true;
    }

    return false;
  }

  getRanges() {
    const ranges = [];

    for (const droplet of this.pool) {
      const range = droplet.getRange();

      if (!range || range[0] === range[1]) continue;

      ranges.push(range);
    }

    return ranges;
  }
}

export default Droplets;