export class Tree<T> {
    #parent: Tree<T>;
    #children: (Tree<T> | T)[];

    constructor(children: (Tree<T> | T)[] | void, parent: Tree<T> | void) {
        this.#children = children ? children : [];
        this.#parent = parent ? parent : this;
    }
    add(child: Tree<T> | T): void {
        this.#children.push(child);
    }
    remove(item: Tree<T> | number): Tree<T> | T | void {
        if(typeof item == "number") {
            if(item >= 0 && item < this.#children.length) {
                const removed = this.#children[item];
                this.#children.splice(item, 1);
                return removed;
            }
        } else {
            const idx = this.#children.indexOf(item);
            if(idx != -1) {
                const removed = this.#children[idx];
                this.#children.splice(idx, 1);
                return removed;
            }
        }
    }
    has(item: Tree<T>): boolean {
        return this.#children.includes(item);
    }
    get parent(): Tree<T> {
        return this.#parent;
    }
    get children(): (Tree<T> | T)[] {
        return this.#children;
    }
    get descendants(): T[] {
        let arr: T[] = [];
        this.#children.forEach(child => {
            if(child instanceof Tree) {
                arr = arr.concat(child.descendants);
            } else {
                arr.push(child);
            }
        });
        return arr;
    }
}