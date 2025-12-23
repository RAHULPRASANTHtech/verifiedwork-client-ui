<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id();

        $projects = Project::select(
                'projects.id',
                'projects.name',
                'projects.description',
                'projects.status',
                'projects.created_at'
            )
            ->join('project_users', 'project_users.project_id', '=', 'projects.id')
            ->where('project_users.user_id', $userId)
            ->orderBy('projects.created_at', 'desc')
            ->get();

        return response()->json($projects);
    }
}
