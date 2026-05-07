// SAMPLE FILE: sampleOptimizationDefects.tsx

// 1. Optional Chaining (JS/TS)
export function getUserName(data: any) {
    // Pattern: data && data.user && data.user.profile && data.user.profile.name
    if (data && data.user && data.user.profile && data.user.profile.name) {
        return data.user.profile.name;
    }
    return null;
}

// JSX + optional chaining heuristic
type Product = {
    id?: string;
    title?: string;
    price?: number;
    description?: string;
};

export function ProductDetails(props: { product: Product | null }) {
    const product = props.product;

    if (!product) {
        return <p>No product</p>;
    }

    // Should trigger optional-chaining suggestion on these:
    return (
        <div>
            <p>
                <strong>ID:</strong> {product.id}
            </p>
            <p>
                <strong>Title:</strong> {product.title}
            </p>
            <p>
                <strong>Price:</strong> ${product.price}
            </p>
            <p>
                <strong>Description:</strong> {product.description}
            </p>
        </div>
    );
}

// 2. Nullish Coalescing (JS/TS)
export function getValue(obj: { value: string | null | undefined }) {
    // Pattern: obj.value !== null && obj.value !== undefined ? obj.value : 'default'
    return obj.value !== null && obj.value !== undefined ? obj.value : 'default';
}

// 3. Array Methods (JS/TS)
export function doubleNumbers(nums: number[]) {
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        result.push(nums[i] * 2);
    }
    return result;
}

// 4. Template Literals (JS/TS)
export function greet(name: string) {
    return 'Hello ' + name + '!';
}

// 5. Destructuring (JS/TS)
export function printUser(user: { id: string; name: string }) {
    const id = user.id;
    const name = user.name;
    console.log(id, name);
}

// 6. Early Returns (JS/TS)
export function processOrder(order: { status: string | null; total: number }) {
    if (order) {
        if (order.status === 'cancelled') {
            console.log('Order cancelled');
        } else {
            if (order.total > 0) {
                console.log('Processing order');
            }
        }
    }
}

// 7. Const by Default (JS/TS)
export function computeTotal(prices: number[]) {
    let total = 0;
    for (let i = 0; i < prices.length; i++) {
        total = total + prices[i];
    }
    return total;
}

// 8. Arrow Functions (JS/TS)
export function double(x: number) {
    return x * 2;
}

// 9. Object Shorthand (JS/TS)
export function buildUser(name: string, age: number) {
    const user = { name: name, age: age };
    return user;
}

// 10. Spread Operator (JS/TS)
export function combineArrays(a: number[], b: number[]) {
    return a.concat(b);
}

// 11. Avoid Mutation / Immutability (JS/TS)
export function activateUser(user: { status: string }) {
    user.status = 'active';
    return user;
}

// 12. Set for Lookups (JS/TS)
export function isAllowed(userId: number, allowedIds: number[]) {
    return allowedIds.includes(userId);
}

// 13. Default Parameters (JS/TS)
export function greetGuest(name?: string) {
    if (!name) {
        name = 'Guest';
    }
    return 'Hello ' + name;
}

// 14. Async/Await (JS/TS)
export function loadData(url: string) {
    return fetch(url)
        .then((res) => res.json())
        .then((json) => json);
}

// 15–18. Python-style patterns recreated as strings (so the LLM can still see them)

export const pythonListCompExample = `
squared = []
for x in numbers:
    squared.append(x ** 2)
`;

export const pythonDictMappingExample = `
if x == 'a':
    y = 'A'
elif x == 'b':
    y = 'B'
`;

export const pythonFStringExample = `
message = "Hello {}".format(name)
`;

export const pythonContextManagerExample = `
f = open("file.txt")
try:
    data = f.read()
finally:
    f.close()
`;

// 19–21. Java-style patterns as strings

export const javaEnhancedForExample = `
for (int i = 0; i < items.size(); i++) {
    Item item = items.get(i);
}
`;

export const javaStreamsExample = `
int sum = 0;
for (Item item : items) {
    if (item.isActive()) {
        sum += item.getValue();
    }
}
`;

export const javaGetOrDefaultExample = `
if (map.containsKey(key)) {
    value = map.get(key);
} else {
    value = defaultValue;
}
`;

// 22. DRY Violation (code duplication)
export function logOrderOne(id: string) {
    console.log('Order processed with id: ' + id + ' and status: success');
}
export function logOrderTwo(id: string) {
    console.log('Order processed with id: ' + id + ' and status: success');
}
export function logOrderThree(id: string) {
    console.log('Order processed with id: ' + id + ' and status: success');
}

// 23. Magic Numbers
export function canVote(age: number) {
    if (age > 18) {
        return true;
    }
    return false;
}

export function shouldRetry(retries: number) {
    if (retries > 3) {
        return false;
    }
    return true;
}
