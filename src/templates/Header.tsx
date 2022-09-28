interface HeaderProps {
    user: any | null;
    signOut: () => void;
}

const Header = ({ user, signOut }: HeaderProps) => {
    return (
        <div className="flex justify-between p-6 bg-russian-violet text-white">
            <h1 className="text-4xl font-bangers">Marklarz</h1>
            {user && user.uid && <button className="underline" type="button" onClick={() => signOut()}>Log out</button>}
        </div>
    );
}

export default Header;
