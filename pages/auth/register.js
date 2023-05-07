import { useForm } from "react-hook-form"
import styles from "@/styles/register.module.css"

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch("../serverAuth", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            const users = await res.json();

            // users.forEach((user) => {
            //     const 要素 = document.createElement("タグ名");
            //     要素.innerText = user.JSONの要素のプロパティー名;
            //     lists.appendChild(要素);
            // });
        }
        catch (error) {
            console.error(error);
        }

        return (
            <div className={styles.form}>
                <h1 className={styles.h1}>ユーザー登録</h1>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <label for="email" className={styles.label}>メールアドレス</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "メールアドレスは必須です",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "正しいメールアドレスを入力してください",
                            },
                        })}
                        className={styles.input}
                    />
                    {errors.email && <p className={styles.p}>{errors.email.message}</p>}

                    <label for="password" className={styles.label}>パスワード</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "パスワードは必須です",
                            minLength: { value: 8, message: "8文字以上で入力してください" },
                        })}
                        className={styles.input}
                    />
                    {errors.password && <p className={styles.p}>{errors.password.message}</p>}

                    <button type="submit" className={styles.button}>送信</button>
                </form>
            </div >
        );
    }
}
export default App;
