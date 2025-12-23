<?php
namespace App\Http\Middleware;

use Closure;
use App\Models\User;

class ApiTokenAuth
{
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['error' => 'Token missing'], 401);
        }

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'Invalid token'], 401);
        }

        auth()->setUser($user);

        return $next($request);
    }
}
