/**
 * Created by Alexey S. Kiselev
 */

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeCollection {
    constructor() {
        this.collection = [];
    }

    /**
     * Check if new range is overlaping at least one of the existing ranges
     * @param {Array<number>} range
     * @param {Array<number>} existingRange - one range from range collection
     */
    isOverlap(range, existingRange) {
        return (existingRange[0] <= range[1]) && (existingRange[1] >= range[0]);
    }

    /**
     * Adds a range to the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        let min = range[0], max = range[1], overlaped = 0, firstFound = this.collection.length;
        for(let i in this.collection){
            if(this.isOverlap(range, this.collection[i])){
                overlaped++;
                if(firstFound == this.collection.length) {
                    firstFound = i;
                    min = Math.min(range[0],this.collection[firstFound][0]);
                }
                max = Math.max(range[1],this.collection[i][1]);
            }
        }
        this.collection.splice(firstFound, overlaped, [min, max]);
    }

    /**
     * Removes a range from the collection
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        let overlaped = 0, subCollection = [], firstFound = this.collection.length;
        for(let i in this.collection){
            if(this.isOverlap(range, this.collection[i])){
                if(firstFound == this.collection.length) {
                    firstFound = i;
                }
                if(range[0] > this.collection[i][0]){
                    subCollection.push([this.collection[i][0], range[0]]);
                }
                if(range[1] < this.collection[i][1]){
                    subCollection.push([range[1], this.collection[i][1]]);
                }
                if(subCollection.length) overlaped++;
            }
        }
        this.collection.splice(firstFound, overlaped, ...subCollection);
    }

    /**
     * Prints out the list of ranges in the range collection
     */
    print() {
        console.log(this.collection.map((range)=>{
            return '[' + range[0] + ', ' + range[1] + ')';
        }).join(' '));
    }
}

// Example run
const rc = new RangeCollection();

rc.add([1, 5]);
rc.print();
// Should display: [1, 5)

rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)

rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)

rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
