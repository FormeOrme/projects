class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Check if a vector is within the rectangle
    contains(vector) {
        return (
            vector.x >= this.x &&
            vector.x <= this.x + this.width &&
            vector.y >= this.y &&
            vector.y <= this.y + this.height
        );
    }

    // Check if this rectangle intersects another rectangle
    intersects(range) {
        return !(
            range.x > this.x + this.width ||
            range.x + range.width < this.x ||
            range.y > this.y + this.height ||
            range.y + range.height < this.y
        );
    }
}

class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary; // Rectangle defining the boundary
        this.capacity = capacity; // Max vectors before subdividing
        this.vectors = []; // Store vectors here
        this.divided = false; // Indicates if the tree has subdivided
    }

    subdivide() {
        const { x, y, width, height } = this.boundary;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this.northeast = new Quadtree(new Rectangle(x + halfWidth, y, halfWidth, halfHeight), this.capacity);
        this.northwest = new Quadtree(new Rectangle(x, y, halfWidth, halfHeight), this.capacity);
        this.southeast = new Quadtree(new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight), this.capacity);
        this.southwest = new Quadtree(new Rectangle(x, y + halfHeight, halfWidth, halfHeight), this.capacity);

        this.divided = true;
    }

    insert(vector) {
        if (!this.boundary.contains(vector)) {
            return false; // Ignore vectors that don't fit in the boundary
        }

        if (this.vectors.length < this.capacity) {
            this.vectors.push(vector);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            this.northeast.insert(vector) ||
            this.northwest.insert(vector) ||
            this.southeast.insert(vector) ||
            this.southwest.insert(vector)
        );
    }

    query(range, found = []) {
        if (!this.boundary.intersects(range)) {
            return found; // If range doesn't intersect, return
        }

        for (const vector of this.vectors) {
            if (range.contains(vector)) {
                found.push(vector);
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }

    // Method to find the closest connections for all points in the quadtree
    findClosestConnections(searchRadius = 50) {
        const connections = [];

        // Iterate through all vectors in the quadtree
        for (const vector of this.vectors) {
            let closest = null;
            let minDist = Infinity;

            // Define the range for querying nearby points
            const range = new Rectangle(
                vector.x - searchRadius, vector.y - searchRadius,
                searchRadius * 2, searchRadius * 2
            );

            // Get nearby vectors from the quadtree
            const nearbyVectors = this.query(range);

            // Find the closest point
            for (const other of nearbyVectors) {
                if (vector === other) continue;

                // Calculate the squared distance (avoids the expensive square root)
                const dx = vector.x - other.x;
                const dy = vector.y - other.y;
                const dist = (dx ** 2 + dy ** 2) ** 0.5;

                if (dist < minDist) {
                    minDist = dist;
                    closest = other;
                }
            }

            // If a closest point is found, store the connection
            if (closest) {
                connections.push([vector, closest]);
            }
        }

        return connections;
    }
}
