import { NextResponse } from 'next/server';

// In-memory storage (note: this will reset when server restarts)
const taskViewers: Record<string, Set<string>> = {};

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
        const { user, taskId, action } = body;

        if (!user || !taskId || !action) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!['view', 'close'].includes(action)) {
            return NextResponse.json(
                { message: 'Invalid action' },
                { status: 400 }
            );
        }

        // Initialize Set for taskId if it doesn't exist
        if (!taskViewers[taskId]) {
            taskViewers[taskId] = new Set();
        }

        if (action === 'view') {
            taskViewers[taskId].add(user);
        } else if (action === 'close') {
            taskViewers[taskId].delete(user);
        }

        // Convert Set to Array for JSON response
        const currentViewers = Array.from(taskViewers[taskId]);

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

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const taskId = searchParams.get('taskId');

        if (!taskId) {
            return NextResponse.json(
                { message: 'Missing taskId parameter' },
                { status: 400 }
            );
        }

        const viewers = taskViewers[taskId] || new Set();
        const currentViewers = Array.from(viewers);

        return NextResponse.json({
            taskId,
            viewers: currentViewers,
            viewerCount: currentViewers.length
        }, { headers: getCorsHeaders(request) });
    } catch (error) {
        console.error('Error fetching viewers:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500, headers: getCorsHeaders(request) }
        );
    }
} 