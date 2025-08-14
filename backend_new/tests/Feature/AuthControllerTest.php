<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_duplicate_email()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');
    }

    public function test_login_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('correct_password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'wrong_password',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');
    }

    public function test_register_valid_user()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Valid User',
            'email' => 'validuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);
        $response->assertJson(['message' => 'Usuário registrado com sucesso']);
        $this->assertDatabaseHas('users', ['email' => 'validuser@example.com']);
    }

    public function test_login_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'validlogin@example.com',
            'password' => bcrypt('validpassword'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'validlogin@example.com',
            'password' => 'validpassword',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['access_token', 'token_type', 'expires_in']);
    }

    public function test_profile_requires_authentication()
    {
        $response = $this->getJson('/api/profile');
        $response->assertStatus(401);
    }

    public function test_profile_returns_user_data()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/profile');

        $response->assertStatus(200);
        $response->assertJsonFragment(['email' => $user->email]);
    }

    public function test_logout_revokes_token()
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/logout');

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Logout realizado com sucesso']);
    }

    public function test_users_list_requires_authentication()
    {
        $response = $this->getJson('/api/users');
        $response->assertStatus(401);
    }

    public function test_users_list_returns_users()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/users');

        $response->assertStatus(200);
        $response->assertJsonFragment(['email' => $user->email]);
    }

    public function test_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->deleteJson('/api/users/' . $user->id);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Usuário removido com sucesso']);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_token_expiration()
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        // Acesso com token válido
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/profile');
        $response->assertStatus(200);

        // Espera 70 segundos para garantir que o token expire (configuração 1 minuto)
        sleep(70);

        // Acesso com token expirado
        $responseExpired = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/profile');
        $responseExpired->assertStatus(401);
    }
}
