<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $this->userService->register($request->validated());

        return response()->json(['message' => 'Usuário registrado com sucesso'], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $token = $this->userService->login($request->validated()['email'], $request->validated()['password']);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => 7200,
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }

    public function index(): JsonResponse
    {
        $users = $this->userService->getAllUsers();

        return response()->json($users);
    }

    public function destroy($id): JsonResponse
    {
        $this->userService->deleteUser($id);

        return response()->json(['message' => 'Usuário removido com sucesso']);
    }
}
