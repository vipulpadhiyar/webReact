import React, { useEffect } from 'react';
import { formatDate } from './nonexistent-helper'; // unused import (if file has no other `formatDate` usage)

// Triggers optional-chaining style: guarded access without ?.
const BrokenOptional = (props: { user?: { name?: string } }) => {
    const u = props.user;
    if (!u) return null;
    return <span>{u.name}</span>; // deterministic scanner looks for patterns like `data && data.x` in some cases; plain u.name after guard may vary — add line below for clearer optional-chain signal
};

const OptionalChainSmoke = () => {
    const data = { nested: { value: 1 } } as { nested?: { value: number } } | null;
    return <div>{data && data.nested && data.nested.value}</div>;
};

// Hardcoded UI text (if your scanner flags Text/h1/p/label/span children)
export const HardcodedTextSmoke = () => (
    <>
        <h1>Smoke Test Title</h1>
        <p>Hardcoded paragraph</p>
    </>
);

// Inline style blocker (tsx)
export const InlineStyleSmoke = () => <div style={{ color: 'red' }}>x</div>;

// Missing try/catch on await fetch (added line in diff)
export const FetchSmoke = async () => {
    const response = await fetch('/api/health');
    return response.json();
};

// Debug / log noise on a + line
export const LogSmoke = () => {
    console.log('review smoke');
    debugger;
    return null;
};

// reduce-lines / verbosity: redundant branches (AI + prompt)
export const VerboseBranchSmoke = (x: number | null) => {
    if (x === null) {
        return 0;
    } else {
        if (x > 0) {
            return x;
        } else {
            return 0;
        }
    }
};

// Unused variable
export const UnusedVarSmoke = () => {
    const neverRead = 42;
    return <span>ok</span>;
};

// Optional: secret-like string (only if you want to test secret scanner — be careful, use fake token shape)
const FAKE_TOKEN_FOR_SCANNER_TEST = 'ghp_000000000000000000000000000000000000';

export default function ReviewSmokeTestPage() {
    useEffect(() => {
        void FetchSmoke();
    }, []);
    return (
        <div>
            <BrokenOptional user={{ name: 'a' }} />
            <OptionalChainSmoke />
            <HardcodedTextSmoke />
            <InlineStyleSmoke />
            <LogSmoke />
            <UnusedVarSmoke />
            <span>{VerboseBranchSmoke(1)}</span>
            <span>{FAKE_TOKEN_FOR_SCANNER_TEST}</span>
        </div>
    );
}
