package com.picpay.rh.service;

import com.picpay.rh.model.Funcionario;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class FuncionarioService {
    private final List<Funcionario> funcionarios = new ArrayList<>();
    private final AtomicLong proximoId = new AtomicLong(1);

    public FuncionarioService() {
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Adriel Pimentel", "adriel.pimentel@picpay.com",
                "11979678570", "CTO", "Transformação Digital", 50000.0, "São Paulo", "EM_ANALISE"));
        funcionarios.add(new Funcionario(proximoId.getAndIncrement(), "Pedro Sena", "pedro.sena@picpay.com",
                "11246976924", "Estagiário", "Transformação Digital", 1064.0, "São Paulo", "APROVADO"));
    }

    public List<Funcionario> listarTodos() {
        return funcionarios;
    }

    public Optional<Funcionario> buscarPorId(Long id) {
        return funcionarios.stream()
                .filter(f -> f.getId().equals(id))
                .findFirst();
    }

    public Funcionario cadastrar(Funcionario funcionario) {
        funcionario.setId(proximoId.getAndIncrement());
        if (funcionario.getStatus() == null) {
            funcionario.setStatus("EM_ANALISE");
        }
        funcionarios.add(funcionario);
        return funcionario;
    }

    public Optional<Funcionario> atualizar(Long id, Funcionario dadosAtualizados) {
        return buscarPorId(id).map(funcionario -> {
            funcionario.setNome(dadosAtualizados.getNome());
            funcionario.setEmail(dadosAtualizados.getEmail());
            funcionario.setTelefone(dadosAtualizados.getTelefone());
            funcionario.setCargo(dadosAtualizados.getCargo());
            funcionario.setDepartamento(dadosAtualizados.getDepartamento());
            funcionario.setSalario(dadosAtualizados.getSalario());
            funcionario.setCidade(dadosAtualizados.getCidade());
            funcionario.setStatus(dadosAtualizados.getStatus());
            return funcionario;
        });
    }

    public Optional<Funcionario> atualizarParcial(Long id, Funcionario dadosParciais) {
        return buscarPorId(id).map(funcionario -> {
            if (dadosParciais.getNome() != null) funcionario.setNome(dadosParciais.getNome());
            if (dadosParciais.getEmail() != null) funcionario.setEmail(dadosParciais.getEmail());
            if (dadosParciais.getTelefone() != null) funcionario.setTelefone(dadosParciais.getTelefone());
            if (dadosParciais.getCargo() != null) funcionario.setCargo(dadosParciais.getCargo());
            if (dadosParciais.getDepartamento() != null) funcionario.setDepartamento(dadosParciais.getDepartamento());
            if (dadosParciais.getSalario() != null) funcionario.setSalario(dadosParciais.getSalario());
            if (dadosParciais.getCidade() != null) funcionario.setCidade(dadosParciais.getCidade());
            if (dadosParciais.getStatus() != null) funcionario.setStatus(dadosParciais.getStatus());
            return funcionario;
        });
    }

    public boolean excluir(Long id) {
        return funcionarios.removeIf(f -> f.getId().equals(id));
    }
}