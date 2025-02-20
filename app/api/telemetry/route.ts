import { NextResponse } from 'next/server';

// In-memory storage (note: this will reset when server restarts)
const taskViewers: Record<string, Map<string, number>> = {};

// CORS configuration
const allowedOrigins = [
    'https://task-multiplayer-e9ffkvnod-saranshgrovers-projects.vercel.app',
    'https://task-multiplayer-git-main-saranshgrovers-projects.vercel.app',
    'https://task-multiplayer.vercel.app'
];

function getCorsHeaders(request: Request) {
    const origin = request.headers.get('origin');
    // Only allow specified origins
    const isAllowedOrigin = origin && allowedOrigins.includes(origin);
    
    return {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
}

export async function OPTIONS(request: Request) {
    return NextResponse.json({}, { headers: getCorsHeaders(request) });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user, taskId } = body;

        if (!user || !taskId) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Initialize Map for taskId if it doesn't exist
        if (!taskViewers[taskId]) {
            taskViewers[taskId] = new Map();
        }

        const now = Date.now();

        // Clean up stale viewers (inactive for more than 10 seconds)
        for (const [viewerId, lastSeen] of taskViewers[taskId].entries()) {
            if (now - lastSeen > 10000) {
                taskViewers[taskId].delete(viewerId);
            }
        }

        // Update timestamp for current user
        taskViewers[taskId].set(user, now);

        // Convert Map to array of viewers
        const currentViewers = Array.from(taskViewers[taskId].keys());

        return NextResponse.json({
            taskId,
            viewers: currentViewers,
            viewerCount: currentViewers.length
        }, { headers: getCorsHeaders(request) });
    } catch (error) {
        console.error('Error processing telemetry:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500, headers: getCorsHeaders(request) }
        );
    }
}
 